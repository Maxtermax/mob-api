function shouldRefreshAccessKey({ token, refreshToken }) {
  let stage = fs.readFileSync(path.join(__dirname, "profile.gql"), "utf-8")
  return request.post('/graphql')
    .send({ query: stage })
    .set("token", token)
    .set("refresh-token", refreshToken)
    .expect(response => {
      //console.log(response.headers)
      expect(response).to.containSubset({
        header: {
          "token": candidate => expect(candidate).to.be.an('string'),
          "refresh-token": candidate => expect(candidate).to.be.an('string')
        }
      })
    })
}

function shouldGetExpiredToken({token, refreshToken}) {
  let stage = fs.readFileSync(path.join(__dirname, "profile.gql"), "utf-8")
  return request.post('/graphql')
    .send({ query: stage })
    .set("token", token)
    .set("refresh-token", refreshToken)
    .expect(response => {
      //console.log(response.body)
      expect(response.body).to.containSubset({
        error: { message: "ExpiredToken" }
      })
    })  
}

function waitUntilTokenExpire(AccessKey, done) {
  //wait until the token expire 
  //wait until the refreshToken expire
  //As long the refreshToken is not expired the server should return a new token and refreshToken
  //If the token and the refreshToken are both expired then the server should reject the requests  
  let time = 1000 * 60;//wait 1 minute
  console.log("\t✋ Wait 1m until the token get expired...");
  waitUntil()
    .interval(time)
    .times(1)
    .condition(() => true)
    .done(function (result) {
      shouldRefreshAccessKey(AccessKey)
        .then(response => {
          //console.log("Done!!, the server has refresh the tokens");
          done();
        })
        .catch(error => done(error));
    })
}

function waitUntilRefreshTokenExpire(AccessKey, done) {
  let time = 2000 * 60;//wait 2 minutes
  console.log("\t ✋ Wait 2m until the refresh- token get expired...")
  waitUntil()
    .interval(time)
    .times(1)
    .condition(() => true)
    .done(function (result) {
      shouldGetExpiredToken(AccessKey)
        .then(response => {
          //console.log("Done!!");
          done();
        })
        .catch(error => done(error));
    })
  
}

module.exports = {
  stages: [
    {
      handler: waitUntilTokenExpire,
      name: "Token get expired"
    },
    {
      handler: waitUntilRefreshTokenExpire,
      name: "Refresh token get expired"      
    }
  ]
}