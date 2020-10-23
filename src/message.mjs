export default class Message {
  constructor({ task, request }) {
    this.task = task;
    this.request = request;
  }

  static get OkRequest() {
    return new Message({ task: "isOk", request: true });
  }

  isInstance(other) {
    return this.task === other.task && this.request == other.request;
  }
}
