/* globals chrome */
class Set {
  constructor() {
    this.loadedLocal = false;
    this.storage = {};
  }

  get loaded() {
    return this.loadedLocal;
  }

  async load() {
    if (!this.loadedLocal) {
      return await this._loadLocal();
    }
    return true;
  }

  async save() {
    // could be quicker to save single
    chrome.storage.local.set(this.storage);
  }

  async _loadLocal() {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, (result) => {
        if (typeof result !== "undefined") {
          for (let el in result) {
            if (Object.prototype.hasOwnProperty.call(result, el)) {
              this._addToSettings(el, result[el]);
            }
          }
        }
        this.loadedLocal = true;
        resolve();
      });
    });
  }
}

const handler = {
  set: (obj, prop, value) => {
    obj.storage[prop] = value;
    obj.save(prop);
  },
  get: (obj, prop) => {
    return obj.storage[prop];
  },
  apply: (target, thisArg, args) => {
    return target(args);
  },
}; //new Proxy(new Set(), handler);

const $et = new Set();
