const PostgresSqlProvider = require("./PostgresSqlProvider");

class DataProvider extends PostgresSqlProvider {
  constructor() {
    super();
    const hasInstance = Boolean(DataProvider.instance);
    if (hasInstance) return DataProvider.instance;
    DataProvider.instance = this;
    this.initialize();
    return this;
  }
  async initialize() {
    const { error: connectException } = await resolvePromise(
      this.createConnection({ name: "conexion1", url: "uri://test" })
    );
    if (connectException) return Promise.reject(connectException);

    const { error: connectDbException } = await resolvePromise(
      this.createDatabase("pepitoperez")
    );
    if (connectDbException) return Promise.reject(connectException);
    return Promise.resolve(true);
  }
}

module.exports = DataProvider;
