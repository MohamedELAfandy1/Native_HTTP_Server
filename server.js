const http = require("http");
const { processUrl } = require("./utils/parseUrl");
const { route } = require("./routes/router");

const server = http.createServer(async (req, res) => {
  let url = processUrl(req.url);
  let body = "";

  req.on("data", chunk => { body += chunk; });
  req.on("end", async () => {
    try {
      body = body ? JSON.parse(body) : {};
    } catch {
      res.statusCode = 400;
      return res.end("Invalid JSON");
    }

    await route(req, res, url, body);
  });
});

server.listen(8000, () => console.log("Listening on 8000"));
