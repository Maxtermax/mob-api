class User extends DataProvider {}

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize: User.connection,
    timestamps: true,
    modelName: "User",
    indexes: [
      {
        unique: true,
        fields: ["email"]
      }
    ]
  }
);

User.beforeCreate(user => {
  const hash = hashPassword(user.password);
  user.password = hash;
  return user;
});

module.exports = User;
