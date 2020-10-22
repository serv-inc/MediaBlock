//var expect = require("chai").expect;
import chai from "chai";
import Message from "../src/message.mjs";
const expect = chai.expect;

describe("message", () => {
  describe("Ok", () => {
    it("exists", () => {
      expect(Message.isOk).to.be.a("object");
    });

    it("compares", () => {
      expect(Message.fromObject({ task: "isOk" }).isInstance(Message.isOk)).to
        .be.true;
    });
  });
});
