const cors = require("cors");

module.exports = function () {
  return cors({
    origin: [
      "http://localhost:8000",
      "https://mob-client.now.sh",
      "https://d24dc04c.ngrok.io",
    ],
  });
};
