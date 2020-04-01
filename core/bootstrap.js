const generateProvider = () => {
  let provider = null;
  try {
    provider = new DataProvider();
    return provider;
  } catch (exception) {
    logger({ exception });
  }
  return provider;
};

function bootstrap() {
  const provider = generateProvider();
  logger({ provider });
}

module.exports = bootstrap;
