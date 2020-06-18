const assert = require("assert").strict;
var Whitelist = require("../src/browserify/whitelist.js").default;
var mockStorage = require("../meta/mockExt.js").default.storage;

describe("Whitelist", function () {
  it("should run", function () {
    new Whitelist(mockStorage);
  });
  it("should contain mock values", async function () {
    let w = new Whitelist((storage = mockStorage));
    let q = await w.get();
    assert.match("hello", q);
  });
  it("should be initialized", async function () {
    let w = new Whitelist((storage = mockStorage));
    let q = await w.get();
    assert.ok(w.initialized);
  });
});
