const Connection = require("./Connection");

const DbStructure = {
  name: String
};

class PostgresSqlProvider extends Connection {
  constructor() {
    super();
    this.database = DbStructure;
  }
  createDatabase(name) {
    this.database.name = name;
    return Promise.resolve({ database: this.database });
  }
}

module.exports = PostgresSqlProvider;
