function missingSessionHandler(AccesKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "missingSession.gql"), "utf-8")
  request.post('/graphql')
    .send({ query: stage })
    .expect(res => {
      //console.log(res)
      let { body } = res;
      let { data, errors = [] } = body;
      expect(errors[0]).to.containSubset({
        extensions: {
          code: "missingSession"
        }
      })
    })
    .expect(200, done)
}

function successHandler({ token, refreshToken }, done) {
  let stage = fs.readFileSync(path.join(__dirname, "success.gql"), "utf-8")
  request.post('/graphql')
    .send({ query: stage })
    .set("token", token)
    .set("refresh-token", refreshToken)
    .expect(response => {
      //console.log(response)
      let { body } = response;
      let { data, errors = [] } = body;
      //console.log(response);
      expect(data).to.containSubset({
        logout: { ok: true }
      })
    })
    .expect(200, done)
}

module.exports = {
  stages: [
    {
      handler: missingSessionHandler,
      name: "Missing session"
    },
    {
      handler: successHandler,
      name: "Success"      
    }
  ]
}