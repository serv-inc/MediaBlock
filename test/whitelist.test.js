/* globals describe, it, beforeEach */
const assert = require("chai").assert;
const Whitelist = require("../src/browserify/whitelist.js").default;
let mockStorage;

describe("Whitelist", function () {
  beforeEach(() => {
    mockStorage = require("../meta/mockExt.js").default.storage;
  });

  it("should run", function () {
    new Whitelist(mockStorage);
  });

  it("should be initialized", async function () {
    let w = new Whitelist(mockStorage);
    let q = await w.get();
    assert.ok(w.initialized);
  });

  it("should contain mock values", async function () {
    let w = new Whitelist(mockStorage);
    let q = await w.get();
    assert.match("hello", q);
  });

  it("should not contain other values", async function () {
    let w = new Whitelist(mockStorage);
    let q = await w.get();
    assert.notMatch("not existing", q);
  });

  it("should return the same values", async function () {
    let w = new Whitelist(mockStorage);
    let q = await w.get();
    let q2 = await w.get();
    assert.deepEqual(q2, q);
  });

  it("should allow adding", async function () {
    let w = new Whitelist(mockStorage);
    await w.add("asdf");
    let q = await w.get();
    assert.match("asdf", q);
    await w.remove("asdf");
    q = await w.get();
    assert.notMatch("asdf", q);
  });

  it("should allow removing", async function () {
    let w = new Whitelist(mockStorage);
    await w.remove("asdf");
    let q = await w.get();
    assert.notMatch("asdf", q);
  });

  it("should allow removing with adding", async function () {
    let w = new Whitelist(mockStorage);
    w.add("asdf");
    await w.remove("asdf");
    let q = await w.get();
    assert.notMatch("asdf", q);
  });

  it("should allow removing with awaited adding", async function () {
    let w = new Whitelist(mockStorage);
    await w.add("asdf");
    await w.remove("asdf");
    let q = await w.get();
    assert.notMatch("asdf", q);
  });
});
