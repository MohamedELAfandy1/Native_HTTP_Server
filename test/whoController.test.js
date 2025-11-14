jest.mock("../services/authService", () => ({
  checkAuth: jest.fn(),
}));

const { handleWho } = require("../controllers/whoController");
const { checkAuth } = require("../services/authService");

beforeEach(() => {
  jest.clearAllMocks();
});

test("handleWho GET returns correct message", async () => {
  checkAuth.mockResolvedValue(true);

  const req = {
    method: "GET",
    headers: { authorization: `Bearer anytoken` },
  };

  let resMsg = "";
  const res = {
    end: (msg) => {
      resMsg = msg;
    },
  };

  await handleWho(req, res);

  expect(resMsg).toBe("Http Server on NodeJs");
});

test("handleWho GET returns Unauthorized", async () => {
  checkAuth.mockResolvedValue(false);

  const req = {
    method: "GET",
    headers: { authorization: `Bearer invalidtoken` },
  };

  let resMsg = "";
  const res = {
    end: (msg) => {
      resMsg = msg;
    },
  };

  await handleWho(req, res);

  expect(resMsg).toBe("Unauthorized");
});
