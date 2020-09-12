const expect = chai.expect;

describe("code", () => {
  it("might work", () => {
    expect(1 + 1).to.equal(2);
  });
});

describe("settings", () => {
  it("loads", async () => {
    expect($set).toBeTruthy();
    await $set.load();
    chai.expect($set.initialized).to.be(true);
  });
});
