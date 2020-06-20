"use strict";
// licensed under GPL 2 by github.com/serv-inc version from 2018-10-04
let _store = { limit: 160, _initialized: true };
const _store_man = { limit: 160, whitelist: ["hello", "world"] };
let _store_updated = { limit: 0 };
let _listeners = [];

const chrome = {
  _store: _store,
  _store_man: _store_man,
  _store_updated: _store_updated,
  _listeners: _listeners,
  runtime: {
    onMessage: {
      addListener: function () {},
    },
  },
  storage: {
    local: {
      get: async (a, callback) => {
        const promise1 = new Promise((resolve, reject) => {
          setTimeout(() => {
            callback(_store);
            resolve(_store);
          }, 3);
        });
      },
      set: (a, callback) => {
        for (let el in a) {
          if (a.hasOwnProperty(el)) {
            _store[el] = a[el];
          }
        }
        callback(true);
      },
    },
    managed: {
      get: async (a, callback) => {
        const promise1 = new Promise((resolve, reject) => {
          setTimeout(() => {
            callback(_store_man);
            resolve(_store_man);
          }, 3);
        });
      },
    },
    onChanged: {
      addListener: (listener) => _listeners.push(listener),
    },
  },
  _triggerChange(
    changeSet = { limit: { newValue: 0, oldValue: 160 } },
    area = "managed"
  ) {
    _listeners.forEach((listener) => {
      listener(changeSet, area);
    });
  },
};

exports.default = chrome;
