/** Whitelist data from managed storage and live */
/* globals chrome */
const WHITELIST = "google.*newtab|google.*source[^/]*url";

const w = class Whitelist {
  constructor(storage) {
    this.storage = storage || chrome.storage;
    this.managed = undefined;
    this.initialized = false;
    // cache warmup
    //    this.get();
  }

  async init() {
    return new Promise((resolve) => {
      this.storage.managed.get("whitelist", (result) => {
        if ("whitelist" in result) {
          this.managed = result.whitelist;
        }
        this.initialized = true;
        resolve();
      });
    });
  }

  async get() {
    if (this.initialized) {
      return;
    }
    await this.init();
    let w = WHITELIST;
    if (this.managed) {
      w += "|" + this.managed.join("|");
    }
    return RegExp(w);
  }
};

exports.default = w;
