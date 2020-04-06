async function createRecord(payload) {
  const { text, movieId, userId } = payload;
  if (!text) {
    return Promise.reject({ ...Exceptions.MISSING_ARGUMENT, details: "text" });
  }
  if (!movieId) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "movieId",
    });
  }
  if (!userId) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "userId",
    });
  }
  if (typeof text !== "string") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "text" });
  }
  if (typeof movieId !== "number") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "movieId" });
  }
  if (typeof userId !== "number") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "userId" });
  }
  const { ok, error, result } = await resolvePromise(
    Comment.create({ text, userId, movieId })
  );
  if (ok) {
    const { id = "" } = result;
    return Promise.resolve({ ok: true, id });
  }
  return Promise.reject({ ...Exceptions.SERVER_ERROR, details: error });
}

module.exports = createRecord;
