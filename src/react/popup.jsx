"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)
/** @fileinfo: show browser action popup */
function formatDomain(domain) {
  return domain.name + " is " + (domain.isOk ? "good " : "bad ") + " company";
}

chrome.runtime.sendMessage({ task: "isOk" }, function handler(response) {
  const element = <p>{formatDomain(response.data)}!</p>;

  ReactDOM.render(element, document.getElementById("root"));
});
