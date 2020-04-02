const fetch = require("node-fetch");
exports.fetch = fetch;
exports.BASE = "https://api.themoviedb.org/3";

exports.fetchMovies = require("./fetchMovies");
