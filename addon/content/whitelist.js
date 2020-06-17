/** Whitelist data from managed storage and live */
const WHITELIST = "google.*newtab|google.*source[^\/]*url";

const whitelist = class Whitelist {
  constructor(storage) {
    this.storage = storage || chrome.storage;
    this.managed = undefined;
    this.initialized = false;
    // cache warmup
    this.get();
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.storage.managed.get("whitelist", (result) => {
      if ( "whitelist" in result ) {
        this.managed = result.whitelist;
      }
      this.initialized = true;
    });
  }

  async get() {
    await this.init()
    let w = WHITELIST;
    if (this.managed) {
      w += "|" + this.managed.join('|');
    }
    return RegExp(w);
  }
}

exports.default = whitelist;
