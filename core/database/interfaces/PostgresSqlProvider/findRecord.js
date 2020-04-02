const findRecord = async (id = "") => {
  if (!id) {
    return Promise.reject({ ...Exceptions.MISSING_ARGUMENT, details: "id" });
  }
  const { ok, error, result } = await resolvePromise(
    PostgresSqlProvider.findById(id)
  );
  if (ok) {
    const notFound = result.exists === false;
    if (notFound) return Promise.reject(Exceptions.NOT_FOUND);
    return Promise.resolve(result);
  }
  return Promise.reject({
    ...Exceptions.SERVER_ERROR,
    details: { ...error }
  });
};

module.exports = findRecord;
