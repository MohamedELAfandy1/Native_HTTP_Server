const { checkAuth } = require("../services/authService");

async function handleWho(req, res, auth) {
  if (await checkAuth(auth)) {
    res.end("Http Server on NodeJs");
  } else {
    res.statusCode = 403;
    res.statusMessage = "Unauthorized";
    res.end("Unauthorized");
  }
}

module.exports = { handleWho };
