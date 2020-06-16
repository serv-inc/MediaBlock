"use strict";
/* jshint esversion: 6, strict: global */
/* globals chrome */
/* globals document */
/* globals window */
// licensed under the MPL 2.0 by (github.com/serv-inc)

const WHITELIST = RegExp("google.*newtab|google.*source[^\/]*url");

class Whitelist {
  
  constructor(managed=true) {
    this.managed = undefined;
    this.initialized = false;
    // cache warmup
    this.get();
  }

  async init() {
    if (this.initialized) {
      return;
    }
    if (this.managed) {
      chrome.storage.managed.get("whitelist", function(result) {
        if ( "whitelist" in result ) {
          this.managed = result.whitelist;
        }
        this.initialized = true;
        console.log("storage initialized");
      });
    }
  }

  async get() {
    await this.init()
    let w = WHITELIST;
    if (this.managed) {
      w += "|" + this.managed;
    }
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
