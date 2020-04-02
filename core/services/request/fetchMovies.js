const { BASE, fetch } = require("./index");

const fetchMovies = () => {
  const url = `${BASE}/discover/movie/?api_key=${process.env.TMDB_KEY}&certification_country=US&release_date.gte.gte=2016-11-16`;
  return fetch(url, {
    method: "GET"
  }).then(response => {
    if (response.status !== 200) return Promise.reject(response);
    return response.json();
  });
};

module.exports = fetchMovies;
