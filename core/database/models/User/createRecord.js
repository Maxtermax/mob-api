async function createRecord(payload) {
  const { name = "", email = "" } = payload;
  if (!name) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "name",
    });
  }
  if (!email) {
    return Promise.reject({
      ...Exceptions.MISSING_ARGUMENT,
      details: "email",
    });
  }
  if (typeof name !== "string") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "name" });
  }
  if (typeof email !== "string") {
    return Promise.reject({ ...Exceptions.INVALID_TYPES, details: "email" });
  }
  const { ok, error } = await resolvePromise(User.signUser({ name, email }));
  if (ok) return Promise.resolve({ ok: true });
  return Promise.reject({ ...Exceptions.SERVER_ERROR, details: error });
}

module.exports = createRecord;
