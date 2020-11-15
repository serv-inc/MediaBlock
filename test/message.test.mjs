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

      it("compares", () => {
        const message = new Message({ task: "isOk", request: true });
        expect(message).to.deep.equal(Message.OkRequest);

        expect(message.isInstance(Message.OkRequest)).to.equal(true);
      });
    });
  });
});
