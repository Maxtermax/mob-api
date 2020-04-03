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
/*
Object.assign(PostgresSqlProvider.prototype, {
  find: require("./find"),
});
*/

module.exports = PostgresSqlProvider;
