const app = require("./app");
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    DataProvider.initialize(async (connection, error) => {
      if (error) throw error;
      Object.assign(global, models(connection));
      /*
      Comment.sequalize.sync({ force: true }).then(() => {
        console.log("drop");
      });
      */
      app.listen(PORT, () => {
        logger(`App listen in: port ${PORT}`);
      });
    });
  } catch (error) {
    logger({ error });
  }
}

module.exports = bootstrap;
