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
    describe("Response", () => {
      it("exists", () => {
        expect(Message.OkResponse).to.be.a("object");
      });

      it("has correct props", () => {
        const message = new Message({ task: "isOk", request: false });
        expect(message).to.deep.equal(Message.OkResponse);

        expect(message.isType(Message.OkResponse)).to.equal(true);
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

  describe("isType compares", () => {
    it("Ok to Ok", () => {
      expect(Message.OkRequest.isType(Message.OkRequest)).to.equal(true);
    });
    it("Ok Request to Ok Response", () => {
      expect(Message.OkRequest.isType(Message.OkResponse)).to.equal(false);
    });

    it("Ok Request to Whitelist", () => {
      expect(Message.OkRequest.isType(Message.WhitelistRequest)).to.equal(
        false
      );
    });
  });
});
