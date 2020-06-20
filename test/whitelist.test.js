const assert = require("chai").assert;
const Whitelist = require("../src/browserify/whitelist.js").default;
const mockStorage = require("../meta/mockExt.js").default.storage;

describe("Whitelist", function () {
  it("should run", function () {
    new Whitelist(mockStorage);
  });

  it("should be initialized", async function () {
    let w = new Whitelist((storage = mockStorage));
    let q = await w.get();
    assert.ok(w.initialized);
  });

  it("should contain mock values", async function () {
    let w = new Whitelist((storage = mockStorage));
    let q = await w.get();
    assert.match("hello", q);
  });

  it("should not contain other values", async function () {
    let w = new Whitelist((storage = mockStorage));
    let q = await w.get();
    assert.notMatch("not existing", q);
  });

  it("should return the same values", async function () {
    let w = new Whitelist((storage = mockStorage));
    let q = await w.get();
    let q2 = await w.get();
    assert.deepEqual(q2, q);
  });

  it("should allow adding", async function () {
    let w = new Whitelist((storage = mockStorage));
    await w.add("asdf");
    let q = await w.get();
    assert.match("asdf", q);
  });
});
