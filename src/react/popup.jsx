"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)
/** @fileinfo: show browser action popup */

/** @return link to prop.domain */
function Anchor(prop) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={"https://" + prop.domain}
    >
      {prop.domain}
    </a>
  );
}

/** @return list item for prop.domain */
function Domain(prop) {
  return (
    <li id={prop.domain} key={prop.domain}>
      <Anchor domain={prop.domain} />
    </li>
  );
}

function status(domain) {
  return domain.name + " is " + (domain.isOk ? "good " : "bad ") + " company";
}

function formatWhitelistManaged(whitelist) {
  return (
    <ul>
      {whitelist.data.managed.map((d) => (
        <Domain key={d} domain={d} />
      ))}
    </ul>
  );
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
