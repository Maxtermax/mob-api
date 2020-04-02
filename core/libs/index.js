const config = require("../config");
const { DataProvider, models } = require("../database");
const logger = require("./logger");
const resolvePromise = require("./resolvePromise");
const mapErrorToResponse = require("./mapErrorToResponse");
const hashPassword = require("./hashPassword");

const libs = {
  ...config,
  models,
  hashPassword,
  DataProvider,
  logger,
  resolvePromise,
  mapErrorToResponse
};

Object.assign(global, libs);

module.exports = libs;
