const nextController = (decodedToken, req, next) => {
  req.userId = decodedToken.uid;
  return next();
};

const rejectRequest = (error, res) => {
  console.log(error.code);
  if (error.code === "auth/id-token-expired") return res.status(401).json({ code: "tokenExpired", message: "token expired" });
  return res.status(500).json({ code: "serverError", message: "internal server error" });
};

module.exports = (req, res, next) => {
  const auth = admin.auth();
  const idToken = req.get("token") || (req.query && req.query.token) || "";
  console.log("req ", req.baseUrl);
  if (req.baseUrl.includes("/checkphone")) return next();
  if (!idToken) return res.status(401).json({ code: "missingToken", message: "missing token" });
  return auth
    .verifyIdToken(idToken)
    .then(token => nextController(token, req, next))
    .catch(error => rejectRequest(error, res));
};
