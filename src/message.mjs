export default class Message {
  constructor(input) {
    Object.assign(this, input);
  }

  static get OkRequest() {
    return new Message({ task: "isOk", request: true });
  }

  static get WhitelistRequest() {
    return new Message({ task: "getWhitelist", request: true });
  }

  isType(other) {
    return this.task === other.task && this.request == other.request;
  }
}
