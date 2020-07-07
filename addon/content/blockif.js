"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)

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
const HIDE_STYLE_ID = "good-company-hide-media";

let isOk;

function hideIf(ok) {
  let style = document.querySelector("style#" + HIDE_STYLE_ID);
  if (!ok && style === null) {
    style = document.createElement("style");
    style.id = HIDE_STYLE_ID;
    document.head.appendChild(style);
    style.innerHTML = HIDE_STYLE;
  } else if (ok && !!style) {
    document.head.removeChild(style);
  }
}

function getLocation() {
  if (window.parent === window) {
    // top frame
    return document.location;
  } else {
    // iframe
    return document.referrer;
  }
}

async function main() {
  chrome.runtime.sendMessage(
    { task: "isOkWithUrl", url: getLocation() },
    function handler(response) {
      isOk = response.data.isOk;
      hideIf(isOk);
      //    chrome.browserAction.setIcon({path: "a.png"});  // only from bg, overhead
    }
  );
}

chrome.extension.onMessage.addListener((message /*, sender, sendResponse*/) => {
  console.log(message);
  if (message.task === "toggleContentScript") {
    isOk = !isOk;
    hideIf(isOk);
  } else {
    console.log("unknown");
    console.log(message);
  }
  return true;
});

main();
