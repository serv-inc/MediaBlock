/* globals $et, describe, it, chai, chrome */
const expect = chai.expect;

describe("testing the tests", () => {
  it("should work", () => {
    expect(1 + 1).to.equal(2);
  });
});

describe("settings", () => {
  let $set;
  beforeEach(async () => {
    $set = new Set();
  });

  it("exists", () => {
    expect($set).to.be.ok;
  });

  it("loads", async () => {
    await $set.load();
    expect($set.loadedLocal).to.equal(true);
  });

  describe("storage", () => {
    beforeEach(async () => {
      chrome.storage.local.clear();
      $set.load();
    });

    it("saves", async () => {
      await $set.set("hello", "world");
      await $set.load();
      expect($set.get("hello")).to.equal("world");
    });

    it("saves and local storage has it", async () => {
      await $set.set("hello", "world");
      chrome.storage.local.get("hello", (result) => {
        expect(result.hello).to.equal("world");
      });
    });

    it("saves and all local storage has it", async () => {
      await $set.set("hello", "world");
      chrome.storage.local.get(null, (result) => {
        expect(result.hello).to.equal("world");
      });
    });

    it("saves and next has it", async () => {
      await $set.set("hello", "world");
      let $s2 = new Set();
      await $s2.load();
      expect($s2.get("hello")).to.equal("world");
    });
  });
});
