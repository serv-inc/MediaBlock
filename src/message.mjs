export default class Message {
  constructor(input) {
    Object.assign(this, input);
  }

  static get OkRequest() {
    return new Message({ task: "isOk", request: true });
  }
  static get OkResponse() {
    return new OkResponse({ task: "isOk", request: false });
  }

  static get WhitelistRequest() {
    return new Message({ task: "getWhitelist", request: true });
  }

  isType(other) {
    return this.task === other.task && this.request === other.request;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class OkResponse extends Message {
  get hasUrl() {
    return !!this.url;
  }
}
    
