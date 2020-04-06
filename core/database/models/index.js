module.exports = () => {
  const User = require("./User");
  const Comment = require("./Comment");

  Promise.all([Comment.sync({ force: true }), User.sync({ force: true })]).then(
    () => {
      User.hasMany(Comment);
      Comment.hasOne(User);
      Promise.all([
        Comment.sync({ alter: true, syncOnAssociation: true }),
        User.sync({ alter: true, syncOnAssociation: true }),
      ]).then(() => {
        logger("RELATIONSHIPS DONE: ");
      });
    }
  );
  return {
    User,
    Comment,
  };
};
