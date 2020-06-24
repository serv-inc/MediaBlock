"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)
/** @fileinfo: show browser action popup */
import Status from "./Status.js";

/** shows this site's state */
function onClick() {
  chrome.runtime.sendMessage(
    {
      task: status.props.isOk ? "removeFromWhitelist" : "addToWhitelist",
      name: status.props.name,
    },
    function handler(response) {
      if (!response) {
        console.log("failed to set");
      }
      showTop(status.props.name, !status.props.isOk);
    }
  );
}

let status;

chrome.runtime.sendMessage({ task: "isOk" }, function handler(response) {
  showTop(response.data.name, response.data.isOk);
});
function showTop(name, isOk) {
  status = <Status name={name} isOk={isOk} onClick={onClick} />;

  ReactDOM.render(status, document.getElementById("root"));
}

/** show whitelists */
chrome.runtime.sendMessage({ task: "getWhitelist" }, function handler(
  response
) {
  const managed = (
    <div>
      <Whitelist list={response.data.managed} />
      <Whitelist list={response.data.local} />
    </div>
  );

  ReactDOM.render(managed, document.getElementById("root-managed"));
});

function Whitelist(prop) {
  return (
    <ul>
      {prop.list.map((d) => (
        <Domain key={d} domain={d} />
      ))}
    </ul>
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
