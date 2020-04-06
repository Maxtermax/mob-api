module.exports = () => {
  const User = require("./User");
  const Comment = require("./Comment");

  Promise.all([Comment.sync({ force: true }), User.sync({ force: true })]).then(
    () => {
      User.hasMany(Comment, { as: "comments", foreignKey: "userId" });
      Comment.belongsTo(User, { as: "users", foreignKey: "userId" });
      Promise.all([
        Comment.sync({ alter: true, syncOnAssociation: true }),
        User.sync({ alter: true, syncOnAssociation: true }),
      ]).then(async () => {
        logger("Tables created");
      });
    }
  );
  return {
    User,
    Comment,
  };
};
