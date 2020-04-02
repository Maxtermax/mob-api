function requestDocument({ token, refreshToken }, stage) {
  return request.post('/graphql')
    .send({ query: stage })
    .set("token", token)
    .set("refresh-token", refreshToken)
}

function checkActasValid(response, done) {
  let { body } = response;
  let { data, errors = [] } = body;
  //console.log(JSON.stringify(errors, null, 2))
  try {
    expect(data).to.containSubset({
      findDocuments: [
        {
          files: x => expect(x).to.be.an("array").to.have.all.deep.containSubset({
            id: x => expect(x).to.be.an("string"),
            url: x => expect(x).to.be.an("string"),
            filename: x => expect(x).to.be.an("string"),
            mimetype: x => expect(x).to.be.an("string")
          }),
          author: x => expect(x).to.containSubset({
            name: z => expect(z).to.be.an("string")
          })
        }
      ]
    })
    done();
  } catch (error) {
    done(error);
  }
}

function checkPhotosValid(response, done) {
  let { body } = response;
  let { data, errors = [] } = body;
  //if(errors) console.log(JSON.stringify(errors, null, 2))
  //if(errors) return done(errors);
  try {
    //console.log(JSON.stringify(data, null, 2))
    expect(data).to.containSubset({
      findDocuments: [
        {
          files: x => expect(x).to.be.an("array").to.have.all.deep.containSubset({
            id: x => expect(x).to.be.an("string"),
            url: x => expect(x).to.be.an("string"),
            filename: x => expect(x).to.be.an("string"),
            mimetype: x => expect(x).to.be.an("string")
          }),
          author: x => expect(x).to.containSubset({
            name: z => expect(z).to.be.an("string")
          })
        }
      ]
    })
    done();
  } catch (error) {
    done(error);
  }
}

function ShouldGetAllActas(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "getActas.gql"), "utf-8");
  requestDocument(AccessKey, stage)
    .then(response => checkActasValid(response, done))
}

function ShouldGetAllPhotos(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "getPhotos.gql"), "utf-8");
  requestDocument(AccessKey, stage)
    .then(response => checkPhotosValid(response, done))

}


module.exports = {
  stages: [
    {
      handler: ShouldGetAllPhotos,
      name: "Get photos"
    },
    {
      handler: ShouldGetAllActas,
      name: "Get actas"
    }
  ]
}