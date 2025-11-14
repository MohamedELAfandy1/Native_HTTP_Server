const { checkAuth } = require("../services/authService");
const { generateToken } = require("../services/tokenService");

async function handleLogin(req, res, auth) {
  if (await checkAuth(auth)) {
    const token = await generateToken();
    res.end(token);
  } else {
    res.statusCode = 403;
    res.statusMessage = "Unauthorized";
    res.end("Credentials are not valid");
  }
}

module.exports = { handleLogin };
