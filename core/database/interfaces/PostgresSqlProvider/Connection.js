const Sequelize = require("sequelize");

class Connection {
  constructor() {
    this.connection = {
      name: String,
      uri: String
    };
  }

  createConnection(config) {
    const { name = "", uri = "" } = config;
    this.connection = { name, uri };
    const sequelize = new Sequelize("postgres", "postgres", "mobexample", {
      host: "localhost",
      dialect: "postgres"
    });
    return sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error("Unable to connect to the database:", err);
      });
  }
}

module.exports = Connection;
