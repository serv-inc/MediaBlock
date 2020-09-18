/* globals $et, describe, it, chai */
const expect = chai.expect;

describe("testing the tests", () => {
  it("should work", () => {
    expect(1 + 1).to.equal(2);
  });
});

describe("settings", () => {
  it("exists", () => {
    expect($et).to.be.ok;
  });

  it("loads", async () => {
    await $et.load();
    expect($et.loaded).to.equal(true);
  });

  describe("storage", () => {
    beforeEach(async () => {
      $et.load();
    });

    it("saves", async () => {
      $et.hello = "world";
      await $et.load();
      expect($et.hello).to.equal("world");
    });

    it("saves and next has it", async () => {
      $et.hello = "world";
      const $2 = new Set();
      await $2.load();
      expect($2.hello).to.equal("world");
    });
  });
});
