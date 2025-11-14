jest.mock("../services/authService", () => ({ checkAuth: jest.fn() }));
const { checkAuth } = require("../services/authService");
const { hundleLogin } = require("../controllers/loginController");

beforeEach(() => {
  jest.clearAllMocks();
});

test("hundleLogin returns 200 for valid credentials", async () => {
  checkAuth.mockResolvedValue(true);
  const req = { headers: { authorization: `Basic name:pass` } };
  let resMsg = "";
  const res = {
    end: (msg) => {
      resMsg = msg;
    },
  };
  await hundleLogin(req, res, req.headers["authorization"]);
  expect(resMsg).toMatch(/^[a-f0-9]{32}$/);
  expect(res.statusCode).toBe(200);
  expect(res.statusMessage).toBe("OK");
});

test("hundleLogin returns 401 for invalid credentials", async () => {
  checkAuth.mockResolvedValue(false);
  const req = { headers: { authorization: `Basic name:pass` } };
  let resMsg = "";
  const res = {
    end: (msg) => {
      resMsg = msg;
    },
  };
  await hundleLogin(req, res, req.headers["authorization"]);
  expect(resMsg).toBe("Credentials are not valid");
  expect(res.statusCode).toBe(403);
  expect(res.statusMessage).toBe("Unauthorized");
});
