function mapErrorToResponse({ res, error }) {
  const requiredFields =
    error &&
    error.hasOwnProperty("requiredFields") &&
    error.requiredFields.length !== 0;
  const invalidFormats =
    (error &&
      error.hasOwnProperty("invalidFormats") &&
      error.invalidFormats.length !== 0) ||
    (error.hasOwnProperty("code") && error && error.code === "invalidFormats");
  const invalidTypes =
    (error &&
      error.hasOwnProperty("invalidTypes") &&
      error.invalidTypes.length !== 0) ||
    (error.hasOwnProperty("code") && error && error.code === "invalidTypes");
  const invalidField =
    (error &&
      error.hasOwnProperty("invalidField") &&
      error.invalidField.length !== 0) ||
    (error.hasOwnProperty("code") && error && error.code === "invalidField");

  const duplicateEmail =
    error &&
    error.hasOwnProperty("code") &&
    error.code === "auth/email-already-exists";
  const notFound =
    error && error.hasOwnProperty("code") && error.code === "notFound";
  const notAllow =
    error && error.hasOwnProperty("code") && error.code === "notAllow";
  const requestRejected =
    error && error.hasOwnProperty("code") && error.code === "requestRejected";
  const MissingArgument =
    error && error.hasOwnProperty("code") && error.code === "missingArgument";

  if (MissingArgument) {
    return res.status(400).json({
      exception: {
        ...Exceptions.MISSING_ARGUMENT,
        ...error,
      },
    });
  }

  if (notFound) {
    return res.status(404).json({
      exception: {
        ...Exceptions.NOT_FOUND,
        ...error,
      },
    });
  }

  if (notAllow) {
    return res.status(405).json({
      exception: {
        ...Exceptions.NOT_ALLOW,
        ...error,
      },
    });
  }

  if (requestRejected) {
    return res.status(403).json({
      exception: {
        ...Exceptions.REQUEST_REJECTED,
        ...error,
      },
    });
  }

  if (duplicateEmail) {
    return res.status(409).json({
      exception: {
        ...Exceptions.DUPLICATE_EMAIL,
        ...error,
      },
    });
  }

  if (requiredFields) {
    return res.status(400).json({
      exception: {
        ...Exceptions.REQUIRED_FIELDS,
        details: error.requiredFields,
      },
    });
  }

  if (invalidFormats) {
    return res.status(400).json({
      exception: {
        ...Exceptions.INVALID_FORMATS,
        details: error.invalidFormats,
      },
    });
  }

  if (invalidTypes) {
    return res.status(400).json({
      exception: {
        ...Exceptions.INVALID_TYPE,
        ...error,
      },
    });
  }

  if (invalidField) {
    return res.status(400).json({
      exception: {
        ...Exceptions.INVALID_FIELD,
        ...error,
      },
    });
  }

  return res.status(500).json({
    exception: Exceptions.SERVER_ERROR,
  });
}

module.exports = mapErrorToResponse;
