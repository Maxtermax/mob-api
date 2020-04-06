async function findByMovieId(movieId) {
  if (!movieId) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "movieId",
    });
  }
  if (!validNumber(movieId)) {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "movieId" });
  }
  const { ok, error, result } = await resolvePromise(
    Comment.findAll({
      include: [{ all: true }],
      where: {
        movieId: Number(movieId),
      },
    })
  );
  logger({ ok, error, result });
  if (ok) {
    const notFound = result === null;
    if (notFound) return Promise.resolve([]);
    return Promise.resolve(result);
  }
  return Promise.reject({ ...Exceptions.SERVER_ERROR, details: error });
}

module.exports = findByMovieId;
