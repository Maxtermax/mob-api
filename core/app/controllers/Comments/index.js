exports.createRecord = async function createRecord(req, res) {
  const { body = {} } = req;
  const { ok, error, result } = await resolvePromise(
    Comment.createRecord(body)
  );
  console.log({ ok, error, result });
  if (ok) return res.status(201).json(result);
  return mapErrorToResponse({ res, error });
};

exports.findByMovieId = async function findByMovieId(req, res) {
  const { params = {} } = req;
  const { id = "" } = params;
  const { ok, error, result } = await resolvePromise(Comment.findByMovieId(id));
  if (ok) return res.status(200).json(result);
  return mapErrorToResponse({ res, error });
};
