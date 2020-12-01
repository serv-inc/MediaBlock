"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)

/** fileoverview
    1. check if url on whitelist
    2. check if active tab on whitelist
    3. add entry to whitelist
    4. get whole whitelist
 */

const Message = require("../message.mjs").default;
const Whitelist = require("./whitelist.js").default;
const whitelist = new Whitelist();


chrome.runtime.onMessage.addListener(route);
/** routes messages */
function route(request, sender, sendResponse) {
  const message = new Message(request)
  if (request.task === "isOkWithUrl" && !!request.url) {
    return isOkWithUrl(request, sender, sendResponse);
  } else if (message.isType(Message.OkRequest) && !request.url) {
    return isOk(request, sender, sendResponse);
  } else if (request.task === "addToWhitelist" && request.name) {
    return addToWhitelist(request, sender, sendResponse);
  } else if (request.task === "getWhitelist") {
    return getWhitelist(request, sender, sendResponse);
  } else if (request.task === "removeFromWhitelist") {
    return removeFromWhitelist(request, sender, sendResponse);
  } else {
    console.log("unknown");
    console.log(request);
  }
}

/** is active / passed url good company ? */
function isOkWithUrl(request, sender, sendResponse) {
  whitelist.get().then((wreg) => {
    sendResponse({
      task: "isOkWithUrl",
      data: { isOk: wreg.test(request.url.host), name: request.url.host },
    });
  });
  return true; // keep channel open
}

/** is active / passed url good company ? */
function isOk(request, sender, sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];
    if (
      !activeTab ||
      typeof activeTab.url === "undefined" ||
      activeTab.url.length === 0
    ) {
      // todo: replace with tabs.onActivated or sth if that is used (also for icon)
      request.url = { host: "page loading, unknown domain" };
    } else {
      const u = new URL(activeTab.url);
      request.url = u;
    }
    isOkWithUrl(request, sender, sendResponse);
  });
  return true; // keep channel open
}

function addToWhitelist(request, sender, sendResponse) {
  whitelist.add(request.name).then((status) => {
    sendResponse({
      task: "addToWhitelist",
      success: status,
    });
  });
  return true; // keep channel open
}

function removeFromWhitelist(request, sender, sendResponse) {
  whitelist.remove(request.name).then((status) => {
    sendResponse({
      task: "removeFromWhitelist",
      success: status,
    });
  });
  return true; // keep channel open
}

function getWhitelist(request, sender, sendResponse) {
  whitelist.data().then((wreg) =>
    sendResponse({
      task: "getWhitelist",
      data: wreg,
    })
  );
  return true; // keep channel open
}
