const fetchProduct = require("../async.js");

describe("Async", () => {
  it("async-done", (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: "은석이", age: 20 });
      done();
    });
  });

  it("async-return", () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: "은석이", age: 20 });
    });
  });
  it("async-await", async () => {
    const product = await fetchProduct();

    expect(product).toEqual({ item: "은석이", age: 20 });
  });
  it("async-resolve", async () => {
    return expect(fetchProduct()).resolves.toEqual({ item: "은석이", age: 20 });
  });
  it("async-reject", async () => {
    return expect(fetchProduct("error")).rejects.toEqual("network error");
  });
});
