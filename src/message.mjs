/** globals process */
const DEBUG = isTest() ? 0 : 2;

function isTest() {
  return process !== undefined && /test:/.test(process.env.npm_lifecycle_event);
}

export default class Message {
  constructor(input) {
    Object.assign(this, input);
    if (DEBUG) {
      console.log(this);
      if (DEBUG > 1) {
        console.log(new Error().stack);
      }
    }
  }

  static get OkRequest() {
    return new Ok({ task: "isOk", request: true });
  }
  static get OkResponse() {
    return new Ok({ task: "isOk", request: false });
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

export class Ok extends Message {
  get hasUrl() {
    return !!this.url;
  }
}
