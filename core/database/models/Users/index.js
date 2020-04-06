const Comment = require("../Comment");
class Users extends DataProvider {}

Users.init(
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      is: /[A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_ .]{3,50}/i,
    },
  },
  {
    sequelize: Users.connection,
    timestamps: true,
    modelName: "User",
  }
);

Comment.belongsTo(User);

Users.findByMovieId = findByMovieId;
Users.createRecord = createRecord;

module.exports = Users;
