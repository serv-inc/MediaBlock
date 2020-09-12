describe("code", () => {
  it("might work", () => {
    chai.expect(1 + 1).to.equal(2);
  });
});

describe("settings", () => {
  describe("loading", async () => {
    chai.should.exist($set);
    await $set.load();
    chai.expect($set.initialized).to.be(true);
  });
});
