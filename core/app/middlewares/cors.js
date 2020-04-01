const cors = require("cors");
const util = require("util");
const whitelist = ["http://localhost:5000"]; //origin allowed to /api

const corsOptionsDelegate = function(req, callback) {
  let corsOptions = {
    "access-control-allow-origin": "*",
    token: true,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": "token"
  };
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }
  console.log("cors ", util.inspect(corsOptions));
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = () => cors(corsOptionsDelegate);
