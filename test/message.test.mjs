//var expect = require("chai").expect;
import chai from "chai";
import Message from "../src/message.mjs";
const expect = chai.expect;

describe("message", () => {
  describe("Ok", () => {
    it("exists", () => {
      expect(Message.OkRequest).to.be.a("object");
    });

    it("compares", () => {
      expect(new Message({ task: "isOk", request: true })).to.deep.equal(
        Message.OkRequest
      );
    });
  });
});
