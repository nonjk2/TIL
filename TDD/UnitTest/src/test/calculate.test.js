const Calculator = require("../calculate");

describe("calculate", () => {
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });

  it("set", () => {
    cal.set(5);
    expect(cal.value).toBe(5);
  });

  it("clear", () => {
    cal.set(10);
    cal.clear();
    expect(cal.value).toBe(0);
  });
  it("add", () => {
    cal.add(2);
    cal.add(3);

    expect(cal.value).toBe(5);
  });
});
