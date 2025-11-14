function handleHi(req, res, queries, body) {
  if (req.method === "GET") {
    res.end(`Hello ${queries.name || "Visitor"} From GET`);
  } else if (req.method === "POST") {
    let name = "Unknown";
    try { name = body.name || "Unknown"; } 
    catch {}
    res.end(`Hello ${name} From POST`);
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
}

module.exports = { handleHi };
