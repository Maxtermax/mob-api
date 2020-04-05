const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { authMiddleware } = require("../app/authConfig");
const bodyParser = require("body-parser");
const Comments = require("./controllers/Comments");

app.use(
  cors({ origin: ["http://localhost:3000", "https://82a091ba.ngrok.io"] })
);
app.use(authMiddleware);

app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/test", (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  });
});

app.get("/api/v1/comments/find/:id", Comments.findByMovieId);
app.post("/api/v1/comments/create", Comments.createRecord);

module.exports = app;
