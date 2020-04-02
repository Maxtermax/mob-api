const PostgresSqlProvider = require("./PostgresSqlProvider");

class DataProvider extends PostgresSqlProvider {
  static async initialize(callback) {
    const {
      error: connectException,
      result: connection
    } = await resolvePromise(PostgresSqlProvider.connect());
    if (callback) {
      if (connectException) return callback(null, connectException);
      DataProvider.connection = connection;
      return callback(connection);
    }
    return null;
  }
}

module.exports = DataProvider;
