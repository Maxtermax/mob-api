const express = require("express");
const app = express();
const morgan = require("morgan");
const { authMiddleware, cors } = require("./middlewares");
const bodyParser = require("body-parser");
const Comments = require("./controllers/Comments");
const Users = require("./controllers/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(authMiddleware);

app.get("/test", (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  });
});

app.get("/api/v1/comments/find/by/movie/:id", Comments.findByMovieId);
app.post("/api/v1/comments/create", Comments.createRecord);

app.post("/api/v1/users/create", Users.createRecord);

module.exports = app;
