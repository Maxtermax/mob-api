const cors = require("cors");

module.exports = function () {
  return cors({
    origin: ["http://localhost:3000", "https://80438248.ngrok.io"],
  });
};
