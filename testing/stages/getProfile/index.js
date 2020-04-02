function ShouldGetNotAllow() {
  let stage = fs.readFileSync(path.join(__dirname, "success.gql"), "utf-8");
  return request.post('/graphql')
    .send({ query: stage })
    .expect(response => {
      //console.log(response)
      let { body } = response;
      let { data, errors = [] } = body;
      //console.log(errors[0]);
      expect(errors[0]).to.containSubset({
        extensions: {
          code: "notAllow"
        }
      })
    })
}

function ShouldGetDocuments({ token, refreshToken }, done) {
  let stage = fs.readFileSync(path.join(__dirname, "populateDocuments.gql"), "utf-8");
  return request.post('/graphql')
    .send({ query: stage })
    .set("token", token)
    .set("refresh-token", refreshToken)
    .expect(response => {
      //console.log(response)
      let { body } = response;
      let { data, errors = [] } = body;
      //console.log(data);
      expect(data).to.containSubset({
        getOwnProfile: {
          name: element => expect(element).to.be.an('string'),
          rol: element => expect(element).to.be.an('string'),
          type: element => expect(element).to.be.an('string'),
          id: element => expect(element).to.be.an('string'),
          documents: element => expect(element).to.be.an('array')
        }
      })
      if (data.documents && data.documents.lenght) {
        expect(data).to.containSubset({
          getOwnProfile: {
            documents: candidate =>
              expect(candidate).to.be.an('array').that.contains.something.like({
                filename: element => expect(element).to.be.an('string')
              })
          }
        })
      }
    })
}


function Unauthorized(AccessKey, done) {
  ShouldGetNotAllow()
    .then(response => {
      //console.log("Done!!");
      done();
    })
    .catch(error => done(error));
}

function PopulateDocuments(AccessKey, done) {
  ShouldGetDocuments(AccessKey, done)
    .then(response => done())
    .catch(error => done(error));
}

module.exports = {
  stages: [
    {
      handler: Unauthorized,
      name: "Request without tokens"
    },
    {
      handler: PopulateDocuments,
      name: "Request the documents field populated"
    }
  ]
}