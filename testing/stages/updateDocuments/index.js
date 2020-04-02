function requestUpdate({ token, refreshToken }, payloads, stage) {
  stage = stage.replace("<id>", `"${payloads.documentId}"`);
  stage = stage.replace("<task>", `"${payloads.taskId}"`);
  return request.post('/graphql')
    .set("token", token)
    .set("refresh-token", refreshToken)
    .send({ query: stage })
}

function requestCreateFile({ token, refreshToken }, apolloClient, payloads, subcription, stage) {
  stage = stage.replace("<belongsTo>", `"${payloads.documentId}"`);
  return new Promise(async (resolve, reject) => {
    apolloClient.subscribe({
      query: gql(subcription),
      variables: { token }
    }).subscribe({
      next(data) {
        console.log("response: ", data);
        resolve(data);
      },
      error(error) {
        console.log("ERROR: ", error)
        reject(error)
      }
    })
    try {
      request.post('/graphql')
        .set("token", token)
        .set("refresh-token", refreshToken)
        .field("operations", JSON.stringify({
          query: stage,
          "variables": { "file": null }
        })
        )
        .field("map", JSON.stringify({
          0: ["variables.file"]
        }))
        .attach("0", path.resolve(__dirname, "./superbad.mp4"))
        .end((err, res) => {
          //if (err) return console.log("err ", JSON.stringify(err, null, 2));
          //console.log("res ", JSON.stringify(res, null, 2));
        })
    } catch (error) {
      //console.log(error);
    }
    //console.log(response)
  })
}

function checkResponseValid(response, done) {
  try {
    expect(response.body).to.containSubset({
      data: {
        updateDocument: { ok: true }
      }
    })
    done();
  } catch (error) {
    done(error);
  }
}

function checkFilResponseValid(response, done) {
  console.log(JSON.stringify(response, null, 2))
  try {
    expect(response).to.containSubset({
      data: {
        fileUpload: {
          data: {
            id: x => expect(x).to.be.an("string"),
            url: x => expect(x).to.be.an("string"),
          }
        }
      }
    })
    done();
  } catch (error) {
    done(error);
  }
}


function updateDocument(AccessKey, apolloClient, payloads, done) {
  requestUpdate(AccessKey, payloads, fs.readFileSync(path.join(__dirname, "success.gql"), "utf-8"))
    .then(response => checkResponseValid(response, done))
    .catch(error => {
      console.log("error ", error);
      done(error);
    })
}

function addFile2Document(AccessKey, apolloClient, payloads, done) {
  let addFile = fs.readFileSync(path.join(__dirname, "addFile.gql"), "utf-8");
  let fileUpload = fs.readFileSync(path.join(__dirname, "fileUpload.gql"), "utf-8");
  requestCreateFile(AccessKey, apolloClient, payloads, fileUpload, addFile)
    .then(response => checkFilResponseValid(response, done))
    .catch(error => {
      console.log("error ", error);
      done(error);
    })
}



module.exports = {
  stages: [
    {
      handler: updateDocument,
      name: "Update document adding a task and changing the name"
    },
    {
      handler: addFile2Document,
      name: "Adding a file to a document"
    }
  ]
}