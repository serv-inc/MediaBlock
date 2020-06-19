"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)

/** fileoverview send whitelist when messaged */

const Whitelist = require("./whitelist.js").default;
const whitelist = new Whitelist();

chrome.runtime.onMessage.addListener(route);
/** routes messages */
function route(request, sender, sendResponse) {
  if (request.task === "isOkWithUrl" && !!request.url) {
    return isOkWithUrl(request, sender, sendResponse);
  } else if (request.task === "isOk" && !request.url) {
    return isOk(request, sender, sendResponse);
  } else {
    console.log("unknown: " + request);
  }
}

/** is active / passed url good company ? */
function isOkWithUrl(request, sender, sendResponse) {
  console.log("isOkWithUrl");
  console.log(request.url);
  whitelist.get().then((wreg) =>
    sendResponse({
      task: "isOkWithUrl",
      data: { isOk: wreg.test(request.url.host) },
    })
  );
  return true;
}

/** is active / passed url good company ? */
function isOk(request, sender, sendResponse) {
  chrome.tabs.query({ active: true }, (tabs) => {
    const activeTab = tabs[0];
    // todo: fails on page load, leaves popup empty, error in log
    const u = new URL(activeTab.url);
    whitelist
      .get()
      .then((wreg) =>
        sendResponse({
          task: "isOk",
          data: { name: u.host, isOk: wreg.test(u.host) },
        })
      )
      .catch((err) => console.log("error is " + err));
  });
  return true; // keep channel open
}
/*
function getWhitelist(request, sender, sendResponse) {
    whitelist
      .get()
      .then((wreg) =>
        sendResponse({
          task: "isOk",
          data: { name: u.host, isOk: wreg.test(u.host) },
        })
      )
  */
