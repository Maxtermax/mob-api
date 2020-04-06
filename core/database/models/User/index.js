const createRecord = require("./createRecord");
const signUser = require("./signUser");

class User extends DataProvider {}

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      is: /[A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_ .]{3,50}/i,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      is: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){3}\.[a-z]{2,3}$/g,
    },
  },
  {
    sequelize: User.connection,
    timestamps: true,
    modelName: "User",
  }
);

User.createRecord = createRecord;
User.signUser = signUser;

module.exports = User;
