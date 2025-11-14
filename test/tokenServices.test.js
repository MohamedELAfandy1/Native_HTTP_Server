const fs = require("fs");
const { generateToken, checkToken, resetToken } = require("../services/tokenService");

beforeEach(async () => {
  await fs.promises.writeFile("tokens.txt", "", "utf-8");
});

test("generateToken should create a token and save to file", async () => {
  const token = await generateToken();
  const content = await fs.promises.readFile("tokens.txt", "utf-8");
  expect(content).toContain(token);
});

test("checkToken should return true for existing token", async () => {
  const token = await generateToken();
  const exists = await checkToken(token);
  expect(exists).toBe(true);
});

test("resetToken should remove token from file", async () => {
  const token = await generateToken();
  await resetToken(token);
  const content = await fs.promises.readFile("tokens.txt", "utf-8");
  expect(content).not.toContain(token);
});
