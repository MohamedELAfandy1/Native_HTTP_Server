const fs = require("fs");
const crypto = require("crypto");
const TOKEN_FILE = "tokens.txt";

async function generateToken() {
  const token = crypto.randomBytes(16).toString("hex");
  await fs.promises.appendFile(TOKEN_FILE, token + "\n", "utf-8");
  setTimeout(() => resetToken(token), 30000);
  return token;
}

async function resetToken(token) {
  let tokens = "";
  try { tokens = await fs.promises.readFile(TOKEN_FILE, "utf-8"); } 
  catch { tokens = ""; }

  const tokenList = tokens.split("\n").filter(t => t.trim() !== "" && t !== token);
  await fs.promises.writeFile(TOKEN_FILE, tokenList.join("\n") + "\n", "utf-8");
}

async function checkToken(token) {
  let tokens = "";
  try { tokens = await fs.promises.readFile(TOKEN_FILE, "utf-8"); } 
  catch { tokens = ""; }

  return tokens.split("\n").includes(token);
}

module.exports = { generateToken, resetToken, checkToken };
