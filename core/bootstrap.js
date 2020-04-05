const { spawn } = require("child_process");
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
        if (process.env.TEST) {
          const ls = spawn("npm", ["test"]);

          ls.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
          });

          ls.stderr.on("data", (data) => {
            console.log(`stderr: ${data}`);
          });

          ls.on("error", (error) => {
            console.log(`error: ${error.message}`);
          });

          ls.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
          });
        }
      });
    });
  } catch (error) {
    logger({ error });
  }
}

module.exports = bootstrap;
