async function bootstrap() {
  try {
    DataProvider.initialize(async (connection, error) => {
      if (error) throw error;
      Object.assign(global, models(connection));
      const { ok, error: createUserException, result } = await resolvePromise(
        User.sync({ force: true }).then(() =>
          User.create({
            name: "esneyder",
            email: "esnene02@gmail.com",
            password: "test"
          })
        )
      );
      console.log({ ok, createUserException, result });
    });
  } catch (error) {
    logger({ error });
  }
}

module.exports = bootstrap;
