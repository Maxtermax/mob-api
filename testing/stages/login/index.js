function succesLogin() {
  let stage = fs.readFileSync(path.join(__dirname, "success.gql"), "utf-8")
  return request.post('/graphql')
    .send({ query: stage })
    .expect(response => {
      //console.log(response.body)
      expect(response.body).to.containSubset({
        data: {
          login: {
            ok: true,
            token: candidate => expect(candidate).to.be.an('string'),
            refreshToken: candidate => expect(candidate).to.be.an('string')
          }
        }
      })
    })
}

function failLogin(stage, code) {
  return request.post('/graphql')
    .send({ query: stage })
    .expect(response => {
      //console.log(response)
      let { body } = response;
      let { data, errors = [] } = body;
      //console.log(errors[0].extensions.code)
      expect(errors[0]).to.containSubset({
        extensions: { code }
      })
    })
}

function successHandler(AccessKey, done) {
  succesLogin()
    .then(response => {
      AccessKey.token = response.body.data.login.token;
      AccessKey.refreshToken = response.body.data.login.refreshToken;
      done();
    })
    .catch(error => done(error));
}

function notFoundHandler(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "notFound.gql"), "utf-8")
  failLogin(stage, "notFound")
    .then(()=> done())
    .catch(error => done(error));
}

function wrongPasswordHandler(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "wrongPassword.gql"), "utf-8")
  failLogin(stage, "wrongPassword")
    .then(() => done())
    .catch(error => done(error));
}

function missingPayloadHandler(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "missingPayload.gql"), "utf-8")
  failLogin(stage, "missingPayload")
    .then(() => done())
    .catch(error => done(error));  
}

module.exports = {
  stages: [
    {
      handler: notFoundHandler,
      name: "User not found"      
    },
    {
      handler: wrongPasswordHandler,
      name: "Wrong password"            
    },
    {
      handler: missingPayloadHandler,
      name: "Missing email or password"      
    },
    {
      handler: successHandler,
      name: "Success"
    }
  ]
}