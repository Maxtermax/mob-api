function requestRestore({ token, refreshToken }, stage) {
  return request.post('/graphql')
    .set("token", token)
    .set("refresh-token", refreshToken)
    .send({ query: stage })
    .expect(response => {
      //console.log(response)
      let { body } = response;
      let { data, errors = [] } = body;
      //console.log(body)
      //console.log(errors[0].extensions.code)
      expect(data).to.containSubset({
        restoreAccount: {
          ok: true
        }
      })
    })
}

function restoreHandler(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "restore.gql"), "utf-8")
  requestRestore(AccessKey, stage)
    .then(() => done())
    .catch(error => done(error));  
}

module.exports = {
  stages: [
    {
      handler: restoreHandler,
      name: "Recuperar cuenta"
    }
  ]
}