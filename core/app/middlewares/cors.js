const cors = require("cors");

module.exports = function () {
  return cors({
    origin: ["http://localhost:8000", "https://2d207d1c.ngrok.io"],
  });
};
