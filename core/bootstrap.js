const app = require("./app");
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

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

        if (process.env.TEST) {
          const newman = require("newman");
          newman.run(
            {
              collection: require("../testing/mob.postman_collection.json"),
              reporters: "cli",
              bail: true,
              environment: {
                url: `http://${HOST}:${PORT}`,
              },
            },
            function (err) {
              if (err) {
                console.log(err);
                process.exit(1);
              } else {
                console.log("collection run complete!");
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
