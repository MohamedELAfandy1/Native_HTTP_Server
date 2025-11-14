const fs = require("fs");
const { generateToken, resetToken, checkToken } = require("./tokenService");

async function checkAuth(auth) {
  if (!auth) return false;

  if (auth.startsWith("Basic ")) {
    let credentials = Buffer.from(auth.replace("Basic ", ""), "base64")
      .toString()
      .split(":");
    return credentials[0] === "admin" && credentials[1] === "admin";
  }

  if (auth.startsWith("Bearer ")) {
    let token = auth.replace("Bearer ", "");
    return await checkToken(token);
  }

  return false;
}

module.exports = { checkAuth };
