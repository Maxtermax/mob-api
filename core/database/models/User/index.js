const createRecord = require("./createRecord");

class User extends DataProvider {}

User.init(
  {
    name: {
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

User.createRecord = createRecord;

module.exports = User;
