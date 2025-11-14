const { checkAuth } = require("../services/authService");
const { generateToken } = require("../services/tokenService");

async function hundleLogin(req, res, auth) {
  if (await checkAuth(auth)) {
    const token = await generateToken();
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.end(token);
  } else {
    res.statusCode = 403;
    res.statusMessage = "Unauthorized";
    res.end("Credentials are not valid");
  }
}

module.exports = { hundleLogin };
