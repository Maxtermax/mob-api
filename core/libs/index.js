const config = require("../config");
const { DataProvider, models } = require("../database");
const logger = require("./logger");
const resolvePromise = require("./resolvePromise");
const mapErrorToResponse = require("./mapErrorToResponse");
const validators = require("./validators.js");

const libs = {
  ...config,
  ...validators,
  models,
  DataProvider,
  logger,
  resolvePromise,
  mapErrorToResponse,
};

Object.assign(global, libs);

module.exports = libs;
