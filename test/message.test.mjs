//var expect = require("chai").expect;
import chai from "chai";
import Message from "../src/message.mjs";
const expect = chai.expect;

describe("message", () => {
  describe("Ok", () => {
    describe("Request", () => {
      it("exists", () => {
        expect(Message.OkRequest).to.be.a("object");
      });

      it("has correct props", () => {
        const message = new Message({ task: "isOk", request: true });
        expect(message).to.deep.equal(Message.OkRequest);

        expect(message.isType(Message.OkRequest)).to.equal(true);
      });
    });
  });

  describe("Whitelist", () => {
    describe("Request", () => {
      it("exists", () => {
        expect(Message.WhitelistRequest).to.be.a("object");
      });
    });
  });
});
