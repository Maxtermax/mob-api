function requestCreate(stage, code) {
  return request.post('/graphql')
    .send({ query: stage })
    .expect(response => {
      //console.log(response)
      let { body } = response;
      let { data, errors = [] } = body;
      //console.log(errors[0].extensions.code)
      console.log(data);
    })
}


function createEntityHandler(AccessKey, done) {
  let stage = fs.readFileSync(path.join(__dirname, "success.gql"), "utf-8")
  requestCreate(stage, "success")
    .then(() => done())
    .catch(error => done(error));
}

module.exports = {
  stages: [
    {
      handler: createEntityHandler,
      name: "Create entity success"
    }
  ]
}