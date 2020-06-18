"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)

const Whitelist = require("./whitelist.js").default;

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
  if (window.parent === window) {
    // top frame
    urlToCheck = document.location;
  } else {
    // iframe
    urlToCheck = document.referrer;
  }
  if (!whitelist.test(urlToCheck)) {
    addStyleRule();
  }
}

function addStyleRule() {
  let style = document.querySelector("style");
  if (style === null) {
    style = document.createElement("style");
    document.head.appendChild(style);
  }
  style.innerHTML += HIDE_STYLE;
}

async function main() {
  const w = new Whitelist(chrome && chrome.storage);
  let whitelist = await w.get();
  hideIf(whitelist);
}

main();
