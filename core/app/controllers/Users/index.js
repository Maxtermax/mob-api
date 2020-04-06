exports.createRecord = async function createRecord(req, res) {
  const { body = {} } = req;
  console.log({ body });
  const { ok, error, result } = await resolvePromise(User.createRecord(body));
  console.log({ ok, error, result });
  if (ok) return res.status(201).json(result);
  return mapErrorToResponse({ res, error });
};
