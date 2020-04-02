function requestCreate({ token, refreshToken }, stage) {
  return request.post('/graphql')
    .set("token", token)
    .set("refresh-token", refreshToken)
    .send({ query: stage })
}

function checkResponseValid(response, payloads, done) {
  try {
    expect(response.body).to.containSubset({
      data: {
        createTask: {
          ok: true,
          id: candidate => expect(candidate).to.be.an('string'),
        }
      }
    })
    payloads.taskId = response.body.data.createTask.id;
    done();
  } catch (error) {
    done(error);
  }
}

function createTask(AccessKey, apolloClient, payloads, done) {
  let stage = fs.readFileSync(path.join(__dirname, "success.gql"), "utf-8").replace("#", `${Date.now()}`);
  requestCreate(AccessKey, stage)
    .then(response => checkResponseValid(response, payloads, done))
    .catch(error => {
      console.log("error ", error);
      done(error);
    })
}


module.exports = {
  stages: [
    {
      handler: createTask,
      name: "Create task"
    }
  ]
}