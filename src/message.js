export default class Message {
  constructor(task) {
    this.task = task;
  }
  static OkRequest() {
    return new Message("isOk");
  }
  isInstance(type) {
    return this.task === type.task;
  }
}
