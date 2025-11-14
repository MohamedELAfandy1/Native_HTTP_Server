const { handleHi } = require("../controllers/hiController");

test("handleHi GET returns correct message", () => {
  const req = { method: "GET" };
  let resMsg = "";
  const res = { end: (msg) => { resMsg = msg; } };
  handleHi(req, res, { name: "Mohamed" }, {});
  expect(resMsg).toBe("Hello Mohamed From GET");
});

test("handleHi POST returns correct message", () => {
  const req = { method: "POST" };
  let resMsg = "";
  const res = { end: (msg) => { resMsg = msg; } };
  handleHi(req, res, {}, { name: "Ali" });
  expect(resMsg).toBe("Hello Ali From POST");
});
