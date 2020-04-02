const User = require("../User");

class Comment extends DataProvider {}

Comment.init(
  {
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    movie: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: Comment.connection,
    timestamps: true,
    modelName: "Comment"
  }
);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = Comment;
