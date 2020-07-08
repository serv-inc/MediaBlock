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

  /** @return true if added, false if not or error */
  async add(elem) {
    const w = await this.get();
    return new Promise((resolve) => {
      if (!w.test(elem)) {
        this.local.push(elem);
        this.storage.local.set({ whitelist: this.local }, () => {
          if (typeof chrome !== "undefined" && chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
      resolve(false);
    });
  }

  /** @return true if removed, false if not or error */
  async remove(elem) {
    const w = await this.get();
    return new Promise((resolve) => {
      if (w.test(elem)) {
        this.local.splice(this.local.indexOf(elem), 1);
        this.storage.local.set({ whitelist: this.local }, () => {
          if (typeof chrome !== "undefined" && chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
      resolve(false);
    });
  }

  computeWhitelist() {
    let w = WHITELIST;
    if (this.managed.length) {
      w += "|" + this.managed.join("|");
    }
    if (this.local.length) {
      w += "|" + this.local.join("|");
    }
    return RegExp(w);
  }
};

exports.default = w;
