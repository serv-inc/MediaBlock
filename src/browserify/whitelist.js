/** Whitelist data from managed storage and live */
/* globals chrome */
const WHITELIST = "google.*newtab|google.*source[^/]*url";

const w = class Whitelist {
  constructor(storage) {
    this.storage = storage || chrome.storage;
    this.initializedLocal = false;
    this.initializedManaged = false;
    this.local = [];
    this.managed = [];
    this.initialize(); // cache warmup
  }

  get initialized() {
    return this.initializedLocal && this.initializedManaged;
  }

  async initialize() {
    if (!this.initialized) {
      return await Promise.all([this.initManaged(), this.initLocal()]);
    }
    return true;
  }

  async initManaged() {
    return new Promise((resolve, reject) => {
      if (this.initializedManaged) {
        resolve();
      }
      this.storage.managed.get("whitelist", (result) => {
        if (
          typeof chrome !== "undefined" &&
          chrome.runtime.lastError &&
          chrome.runtime.lastError.message !==
            "Managed storage manifest not found"
        ) {
          console.error(chrome.runtime.lastError);
          reject();
        }
        if (result !== undefined && "whitelist" in result) {
          this.managed = result.whitelist;
        } else {
          this.managed = [];
        }
        this.initializedManaged = true;
        resolve();
      });
    });
  }
  // TODO: code duplication
  async initLocal() {
    return new Promise((resolve) => {
      if (this.initializedLocal) {
        resolve();
      }
      this.storage.local.get("whitelist", (result) => {
        if (typeof result !== "undefined" && "whitelist" in result) {
          this.local = result.whitelist;
        } else {
          this.local = [];
        }
        this.initializedLocal = true;
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
      } else {
        console.log("already added");
        resolve(false);
      }
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
      } else {
        console.log("already removed");
        resolve(false);
      }
    });
  }

  computeWhitelist() {
    let w = WHITELIST;
    if (this.managed.length) {
      w = [w, this.managed.join("|")].join("|");
    }
    if (this.local.length) {
      w = [w, this.local.join("|")].join("|");
    }
    return RegExp(w);
  }
};

exports.default = w;
