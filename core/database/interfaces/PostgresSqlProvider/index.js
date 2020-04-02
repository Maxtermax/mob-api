const Sequelize = require("sequelize");
const Model = Sequelize.Model;
global.Sequelize = Sequelize;

class PostgresSqlProvider extends Model {
  static async connect() {
    const sequelize = new Sequelize(process.env.DATABASE_URL);
    const { error } = await resolvePromise(sequelize.authenticate());
    if (error) return Promise.reject(error);
    return Promise.resolve(sequelize);
  }
}

Object.assign(PostgresSqlProvider.prototype, {
  find: require("./findRecord"),
  update: require("./update"),
  remove: require("./remove"),
  findById: require("./findById"),
  findRecord: require("./findRecord")
});

module.exports = PostgresSqlProvider;
