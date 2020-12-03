/** globals process */
const DEBUG = isTest() ? 0 : 2;

function isTest() {
  return (
    typeof process !== "undefined" &&
    /test:/.test(process.env.npm_lifecycle_event)
  );
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
    return new Ok({ request: true });
  }
  static get OkResponse() {
    return new Ok({ request: false });
  }

  static get WhitelistRequest() {
    return new Message({ task: "getWhitelist", request: true });
  }

  isType(other) {
    return this.task === other.task && this.request === other.request;
  }
}

export class Ok extends Message {
  constructor(input) {
    super(input);
    this.task = 'isOk';
  }
  get hasUrl() {
    return !!this.url;
  }
  get url() {
    return this.url;
  }
}
