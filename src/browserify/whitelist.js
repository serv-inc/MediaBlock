/** Whitelist data from managed storage and live */
/* globals chrome */
const WHITELIST = "google.*newtab|google.*source[^/]*url";

const w = class Whitelist {
  constructor(storage) {
    this.storage = storage || chrome.storage;
    this.initialized = false;
    this.local = [];
    this.managed = [];
    this.initialize(); // cache warmup
  }

  async initialize() {
    const managed = this.initManaged();
    const local = this.initLocal();
    return Promise.all([managed, local]);
  }

  async initManaged() {
    return new Promise((resolve) => {
      if (this.initialized) {
        resolve();
      }
      this.storage.managed.get("whitelist", (result) => {
        if ("whitelist" in result) {
          this.managed = result.whitelist;
        }
        this.initialized = true;
        resolve();
      });
    });
  }
  // TODO: code duplication
  async initLocal() {
    return new Promise((resolve) => {
      if (this.initialized) {
        resolve();
      }
      this.storage.local.get("whitelist", (result) => {
        if ("whitelist" in result) {
          this.local = result.whitelist;
        }
        this.initialized = true;
        resolve();
      });
    });
  }

  async get() {
    await this.initialize();
    return this.computeWhitelist();
  }

  async data() {
    await this.initialize();
    return { managed: this.managed, local: this.local };
  }

  async add(elem) {
    const w = await this.get();
    if (!w.test(elem)) {
      this.local.push(elem);
      return new Promise((resolve) => {
        this.storage.local.set({ whitelist: this.local }, () => {
          if (chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }
  }

  computeWhitelist() {
    let w = WHITELIST;
    if (this.managed) {
      w += "|" + this.managed.join("|");
    }
    if (this.local) {
      w += "|" + this.local.join("|");
    }
    return RegExp(w);
  }
};

exports.default = w;
