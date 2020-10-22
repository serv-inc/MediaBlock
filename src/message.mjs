export default class Message {
  constructor(task) {
    this.task = task;
  }

  static fromObject(obj) {
    return new Message(obj.task);
  }

  static get isOk() {
    return new Message("isOk");
  }

  isInstance(type) {
    return this.task === type.task;
  }
}
