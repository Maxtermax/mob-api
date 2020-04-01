const config = require("../config");
const { connection, DataProvider, models } = require("../database");
const logger = require("./logger");
const resolvePromise = require("./resolvePromise");
const mapErrorToResponse = require("./mapErrorToResponse");

const libs = {
  ...config,
  connection,
  DataProvider,
  logger,
  resolvePromise,
  mapErrorToResponse
};

Object.assign(global, libs);
Object.assign(global, libs, models());

module.exports = libs;
