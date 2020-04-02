function upload4Files({ token, refreshToken }, stage) {
  return request.post('/graphql')
    .set("token", token)
    .set("refresh-token", refreshToken)
    .field("operations", JSON.stringify({
      query: stage,
      "variables": { "files": [null, null, null, null] }
    })
    )
    .field("map", JSON.stringify({
      0: ["variables.files.0"],
      1: ["variables.files.1"],
      2: ["variables.files.2"],
      3: ["variables.files.3"]
    }))
}

function uploadLargeFile({ token, refreshToken }, apolloClient, stage) {
  const documentUpload = fs.readFileSync(path.join(__dirname, "documentUpload.gql"), "utf-8");
  return (
    new Promise(async (resolve, reject) => {
      apolloClient.subscribe({
        query: gql(documentUpload),
        variables: { token }
      }).subscribe({
        next(data) {
          //console.log("response: ", data);
          resolve(data);
        },
        error(error) {
          //console.log(error)
          reject(error)
        }
      })
      try {
        await request.post('/graphql')
          .set("token", token)
          .set("refresh-token", refreshToken)
          .field("operations", JSON.stringify({
            query: stage,
            "variables": { "files": [null] }
          })
          )
          .field("map", JSON.stringify({
            0: ["variables.files.0"]
          }))
          .attach("0", path.resolve(__dirname, "./champeta.mp4"));
      } catch (error) {
        //console.log(error);
      }
      //console.log(response)
    })
  )
}

function checkValidFields(data, done) {
  //console.log(JSON.stringify(Object.assign(body.data.createDocuments, {}), null, 2));
  try {
    expect(data).to.containSubset({
      createDocuments: {
        errors: item => expect(item).to.be.an("array").that.is.empty,
        transactions: item => expect(item).to.be.an("array").to.have.all.deep.containSubset({
          message: x => expect(x).to.be.an("string"),
          status: x => expect(x).to.be.an("string"),
          data: x => expect(x).to.containSubset({
            departament: x => expect(x).to.be.an("string"),
            id: x => expect(x).to.be.an("string"),
            files: x => expect(x).to.be.an("array").to.have.all.deep.containSubset({
              id: x => expect(x).to.be.an("string"),
              url: x => expect(x).to.be.an("string"),
              filename: x => expect(x).to.be.an("string"),
              mimetype: x => expect(x).to.be.an("string")
            })
          })
        })
      }
    })
    done();
  } catch (error) {
    console.log("error ", error);
    done(error);
  }
}

function CreateMultiplesFile(AccessKey, apolloClient, payloads, done) {
  console.log("\t✋ Uploading... 4 small files.");
  upload4Files(AccessKey, fs.readFileSync(path.join(__dirname, "createMultiplesFiles.gql"), "utf-8"))
    .attach("0", path.resolve(__dirname, "./sanpacho2018.jpg"))
    .attach("1", path.resolve(__dirname, "./yolo.pdf"))
    .attach("2", path.resolve(__dirname, "./mercado.png"))
    .attach("3", path.resolve(__dirname, "./quibdo.jpg"))
    .end((error, response) => {     
      if (error) {
        //console.log("error: ", JSON.stringify(error, null, 2))
        return done(error);
      }
      //console.log("response: ", JSON.stringify(response, null, 2))
      checkValidFields(response.body.data, done);
      payloads.documentId = response.body.data.createDocuments.transactions[0].data.id;
    })
}

async function CreateLargeFile(AccessKey, apolloClient, payloads, done) {
  console.log("\t✋ Uploading... large file may take a several seconds to complete.");
  try {
    const response = await uploadLargeFile(AccessKey, apolloClient, fs.readFileSync(path.join(__dirname, "largeFile.gql"), "utf-8"))
    //console.log(response);
    checkValidFields(response.data, done);
    //console.log("RESPONSE: ", JSON.stringify(response, null, 2));
    //payloads.documentId = response.data.createDocuments.transactions[0].data.id;
  } catch (error) {
    console.log(error);
    done(error);
  }
}

module.exports = {
  stages: [
    {
      handler: CreateMultiplesFile,
      name: "Create multiples files"
    },
    /*
    {
      handler: CreateLargeFile,
      name: "Create large file"
    }
    */
  ]
}