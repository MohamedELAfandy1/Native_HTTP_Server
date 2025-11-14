const { handleHi } = require("../controllers/hiController");
const { handleLogin } = require("../controllers/loginController");
const { handleWho } = require("../controllers/whoController");

function route(req, res, url, body) {
  const auth = req.headers["authorization"];

  switch (url.path) {
    case "/":
      res.end("Home Page");
      break;
    case "/hi":
      handleHi(req, res, url.queries, body);
      break;
    case "/login":
      handleLogin(req, res, auth);
      break;
    case "/who":
      handleWho(req, res, auth);
      break;
    default:
      res.statusCode = 406;
      res.statusMessage = "Not Acceptable";
      res.end();
      break;
  }
}

module.exports = { route };
