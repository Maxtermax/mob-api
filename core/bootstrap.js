const app = require("./app");
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    DataProvider.initialize(async (connection, error) => {
      if (error) throw error;
      Object.assign(global, models(connection));

      /*
      Comment.sync({ force: true }).then(() => {
        console.log("drop");
      });
      */

      app.listen(PORT, () => {
        logger(`App listen in: port ${PORT}`);
        if (process.env.TEST) {
          const newman = require("newman");
          const environment = require("../testing/mob-prod.postman_environment.json");
          newman.run(
            {
              collection: require("../testing/mob.postman_collection.json"),
              reporters: "cli",
              bail: true,
              environment,
            },
            function (err) {
              if (err) {
                logger(err);
                process.exit(1);
              } else {
                logger("collection run complete!");
                process.exit(0);
              }
            }
          );
        }
      });
    });
  } catch (error) {
    logger({ error });
  }
}

module.exports = bootstrap;
