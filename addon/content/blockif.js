"use strict";
/* jshint esversion: 6, strict: global */
/* globals chrome */
/* globals document */
/* globals window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

const WHITELIST = RegExp("google.*newtab|google.*source[^\/]*url");

class Whitelist {
  
  constructor(storage=chrome.storage) {
    this.storage = storage;
    this.managed = undefined;
    this.initialized = false;
    // cache warmup
    this.get();
  }

  async init() {
    if (this.initialized) {
      console.log('wl0');
      return;
    }
    if (this.managed) {
      this.storage.managed.get("whitelist", function(result) {
        console.log('wl1');
        if ( "whitelist" in result ) {
          console.log('wl2');
          this.managed = result.whitelist;
        }
        this.initialized = true;
        console.log('wl3');
        console.log("storage initialized");
      });
    }
  }

  async get() {
    console.log('wlg1');
    await this.init()
    console.log('wlg2');
    let w = WHITELIST;
    if (this.managed) {
      w += "|" + this.managed.join('|');
    }
    console.log(w);
    return RegExp(w);
  }
}

/**
 * @fileoverview hide images if page does not match whitelist
 */
const HIDE_STYLE = `img, video {
    display: none !important; /* 1 */
    height: 1px; /* 3 */
    overflow: hidden; /* 3 */
    visibility: hidden !important; /* 2 */
    width: 1px; /* 3 */
}`;



function hideIf(whitelist) {
  let urlToCheck;
  if ( window.parent === window ) { // top frame
    urlToCheck = document.location;
  } else { // iframe
    urlToCheck = document.referrer;
  }
  if ( ! whitelist.test(urlToCheck) ) {
    addStyleRule();
  }
}

function addStyleRule() {
  let style = document.querySelector("style");
  if ( style === null ) {
    style = document.createElement("style");
    document.head.appendChild(style);
  }
  style.innerHTML += HIDE_STYLE;
}

async function main() {
  const w = new Whitelist()
  let whitelist = await w.get();
  hideIf(whitelist);
}

main();
