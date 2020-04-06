module.exports = () => {
  const User = require("./User");
  const Comment = require("./Comment");
  User.hasMany(Comment, { foreignKey: "userId" });
  Comment.belongsTo(User, { foreignKey: "userId" });

  return {
    User,
    Comment,
  };
};
