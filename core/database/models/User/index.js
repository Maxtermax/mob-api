const Comment = require("./Comment");

class User extends DataProvider {}

User.init(
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      is: /[A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_ .]{3,50}/i,
    },
  },
  {
    sequelize: User.connection,
    timestamps: true,
    modelName: "User",
  }
);

Comment.belongsTo(User);

User.findByMovieId = findByMovieId;
User.createRecord = createRecord;

module.exports = User;
