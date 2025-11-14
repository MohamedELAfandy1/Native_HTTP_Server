const { processUrl, queryString } = require("../utils/parseUrl");

test("processUrl should parse path and query", () => {
  const url = "/hi?name=John&age=25";
  const result = processUrl(url);
  expect(result.path).toBe("/hi");
  expect(result.queries).toEqual({ name: "John", age: "25" });
});

test("queryString should return empty object if no query", () => {
  expect(queryString("/")).toEqual({});
});
