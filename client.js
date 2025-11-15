const http = require("http");
let interval;

function home() {
  const options = {
    method: "GET",
    hostname: "localhost",
    port: 8000,
    path: "/",
    headers: {
      "user-agent": "node-js",
    },
  };
  createRequest(options);
}
function login() {
  const options = {
    method: "GET",
    hostname: "localhost",
    port: 8000,
    path: "/login",
    headers: {
      "user-agent": "node-js",
      authorization:
        "Basic " + Buffer.from("admin:admin").toString("base64"),
    },
  };
  createRequest(options, (data) => {
    console.log(data);
    // who(data);
    interval = setInterval(who, 8000, data);
  });
}
function who(token) {
  const options = {
    method: "GET",
    hostname: "localhost",
    port: 8000,
    path: "/who",
    headers: {
      "user-agent": "node-js",
      authorization: "Bearer " + token,
    },
  };
  createRequest(options, (data, res) => {
    console.log(data);
    if (res.statusCode == 403) {
      clearInterval(interval);
      login();
    }
  });
}
function hi(method) {
  const options = {
    method: method,
    hostname: "localhost",
    port: 8000,
    path: "/hi",
    headers: {
      "user-agent": "node-js",
    },
  };
  if (method == "GET") {
    createRequest(options, (data) => {
      console.log(data);
    });
  } else {
    createRequest(
      options,
      (data) => {
        console.log(data);
      },
      { name: "Mohamed", age: 30 }
    );
  }
}

function createRequest(options, cb, body) {
  let request = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("close", () => {
      if (cb) cb(data, res);
      else console.log(data);
    });
  });
  // console.log(request);
  if (body) {
    request.write(JSON.stringify(body));
  }
  request.end();
  request.on("error", (err) => {
    console.log(err.message);
  });
}

// login();
// home();
hi("GET");
