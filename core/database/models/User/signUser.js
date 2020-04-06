module.exports = function signUser(payload = {}) {
  const { email = "", name } = payload;
  return new Promise((resolve, reject) => {
    User.sequelize.transaction(function (t) {
      return User.findOrCreate({
        where: {
          email,
          name,
        },
        transaction: t,
      })
        .spread(function (userResult, created) {
          if (userResult) return resolve(userResult);
          if (created) return resolve(created);
        })
        .catch(reject);
    });
  });
};
