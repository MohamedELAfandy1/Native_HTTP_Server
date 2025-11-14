const http = require("http");
const fs = require("fs");
const { buffer } = require("buffer");
const crypto = require("crypto");

const server = http.createServer(async (req, res) => {
  let url = processUrl(req.url);
  switch (url.path) {
    case "/":
      res.end("Home Page");
      break;
    case "/hi":
      switch (req.method) {
        case "GET":
          res.end("Hello " + (url.queries.name || "Visitor") + " From GET");
          break;
        case "POST":
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            body = JSON.parse(body);
            res.end("Hello " + (body.name || "Unknown") + " From POST");
          });
          break;
      }
      break;
    case "/login":
      if (await checkAuth(req.headers["authorization"])) {
        let token = await generateToken();
        res.end(token);
      } else {
        res.statusCode = 403;
        res.statusMessage = "Unauthorized";
        res.end("Credentials are not valid");
      }
      break;

    case "/who":
      if (await checkAuth(req.headers["authorization"])) {
        res.end("Http Server on NodeJs");
      } else {
        res.statusCode = 403;
        res.statusMessage = "Unauthorized";
        res.end("Unauthorized");
      }
      break;
    default:
      res.statusCode = 406;
      res.statusMessage = "Not Acceptable";
      res.end();
      break;
  }
});

server.listen(8000, () => {
  console.log("Listening on 8000");
});

function processUrl(url) {
  let link = url.split("?");
  return {
    path: link[0],
    queries: queryString(url),
  };
}
function queryString(str) {
  let queries = {};
  let reg = /.+\?(.+)/;
  let allQueries = reg.exec(str);

  if (allQueries != null) {
    // allQueries[1] = "param1=val1&param2=val2"
    let pairs = allQueries[1].split("&");
    for (let pair of pairs) {
      let [key, value] = pair.split("=");
      queries[key] = value;
    }
  }
  return queries;
}

async function checkAuth(auth) {
  if (auth == undefined) {
    return false;
  } else if (auth.startsWith("Basic ")) {
    //Basic bW9oYW1lZDptb2hhbWVkMTIz
    auth = auth.replace("Basic ", ""); //bW9oYW1lZDptb2hhbWVkMTIz
    let credentials = Buffer.from(auth, "base64").toString();
    credentials = credentials.split(":");
    return credentials[0] == "admin" && credentials[1] == "admin";
  } else if (auth.startsWith("Bearer ")) {
    let token = auth.replace("Bearer ", "");
    let tokens = await fs.promises.readFile("tokens.txt", "utf-8");
    if (tokens) {
      return tokens.split("\n").indexOf(token) >= 0;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

async function generateToken() {
  let token = crypto.randomBytes(16).toString("hex");
  await fs.promises.appendFile("tokens.txt", token + "\n", "utf-8");
  setTimeout(resetToken(token), 30000);
  return token;
}

async function resetToken(token) {
  let tokens = await fs.promises.readFile("tokens.txt", "utf-8");
  let tokenList = tokens
    .split("\n")
    .filter((t) => t.trim() !== "" && t !== token);
  await fs.promises.writeFile(
    "tokens.txt",
    tokenList.join("\n") + "\n",
    "utf-8"
  );
  //
}
