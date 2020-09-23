/* globals chrome */
class Set {
  constructor() {
    this.loadedLocal = false;
    this.storage = {};
  }

  get(name) {
    return this.storage[name];
  }

  async set(name, value) {
    this.storage[name] = value;
    this.save();
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
    chrome.storage.local.get(null, (res2) => {
      console.log(res2);
    });
    return new Promise((resolve) => {
      chrome.storage.local.get(null, (result) => {
        console.debug("hiii");
        console.debug(result);
        for (let el in result || []) {
          if (result.hasOwnProperty(el)) {
            this.storage[el] = result[el];
          }
        }
        this.loadedLocal = true;
        resolve();
      });
    });
  }
}
