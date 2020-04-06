async function createRecord(payload) {
  const { text, movieId } = payload;
  if (!text) {
    return Promise.reject({ ...Exceptions.MISSING_ARGUMENT, details: "text" });
  }
  if (!movieId) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "movieId",
    });
  }
  if (typeof text !== "string") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "text" });
  }
  if (typeof movieId !== "number") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "movieId" });
  }
  const { ok, error } = await resolvePromise(
    Comment.create({ text, userName, movieId })
  );
  if (ok) return Promise.resolve({ ok: true });
  return Promise.reject({ ...Exceptions.SERVER_ERROR, details: error });
}

module.exports = createRecord;
