const resolvePromise = promise =>
  promise
    .then(result => ({ ok: true, result }))
    .catch(error => {
      return Promise.resolve({ ok: false, error });
    });
module.exports = resolvePromise;
