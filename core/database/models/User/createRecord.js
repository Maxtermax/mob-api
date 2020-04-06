async function createRecord(payload) {
  const { name = "" } = payload;
  if (!name) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "name",
    });
  }
  if (typeof name !== "string") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "name" });
  }
  const { ok, error } = await resolvePromise(User.create({ name }));
  if (ok) return Promise.resolve({ ok: true });
  return Promise.reject({ ...Exceptions.SERVER_ERROR, details: error });
}

module.exports = createRecord;
