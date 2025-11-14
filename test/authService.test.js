const { checkAuth } = require("../services/authService");
const { generateToken } = require("../services/tokenService");

test("Basic auth valid credentials", async () => {
  const encoded = Buffer.from("admin:admin").toString("base64");
  const auth = "Basic " + encoded;
  const result = await checkAuth(auth);
  expect(result).toBe(true);
});

test("Basic auth invalid credentials", async () => {
  const encoded = Buffer.from("admin:wrong").toString("base64");
  const auth = "Basic " + encoded;
  const result = await checkAuth(auth);
  expect(result).toBe(false);
});

test("Bearer token valid", async () => {
  const token = await generateToken();
  const auth = "Bearer " + token;
  const result = await checkAuth(auth);
  expect(result).toBe(true);
});

test("Bearer token invalid", async () => {
  const auth = "Bearer invalidtoken";
  const result = await checkAuth(auth);
  expect(result).toBe(false);
});
