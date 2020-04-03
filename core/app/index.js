const express = require("express");
const app = express();
const cors = require("cors");
// const decodeUser = require("./middlewares/decodeUser.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Comments = require("./controllers/Comments");

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(morgan("combined"));
// app.use("*", decodeUser);

app.get("/comments/find/:id", Comments.findByMovieId);
app.post("/comments/create", Comments.createRecord);

module.exports = app;
