"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)
/** @fileinfo: show browser action popup */
function status(domain) {
  return domain.name + " is " + (domain.isOk ? "good " : "bad ") + " company";
}

function formatWhitelistManaged(whitelist) {
  return <ul>{whitelist.data.managed.map((d) => formatDomain(d))}</ul>;
}

function formatDomain(domain) {
  return (
    <li id={domain} key={domain}>
      {toAnchor(domain)}
    </li>
  );
}

function toAnchor(domain) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={toUrl(domain)}>
      {domain}
    </a>
  );
}

function toUrl(domain) {
  return "https://" + domain;
}

chrome.runtime.sendMessage({ task: "isOk" }, function handler(response) {
  const element = <p>{status(response.data)}!</p>;

  ReactDOM.render(element, document.getElementById("root"));
});

chrome.runtime.sendMessage({ task: "getWhitelist" }, function handler(
  response
) {
  const managed = <div>{formatWhitelistManaged(response)}</div>;

  ReactDOM.render(managed, document.getElementById("root-managed"));
});
