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

require("../Comments").belongsTo(User);

Users.findByMovieId = findByMovieId;
Users.createRecord = createRecord;

module.exports = Users;
