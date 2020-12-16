"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)
/** @fileinfo: show browser action popup */
import Status from "./Status.js";
import Message from "../message.mjs";

if (typeof React === "undefined") {
  document.getElementById("root").textContent = "React was not found";
}

let status;

function showTop() {
  chrome.runtime.sendMessage(Message.OkRequest, function handler(response) {
    const message = new Message(response.data);
    status = (
      <Status name={message.name} isOk={message.isOk} onClick={toggleState} />
    );
    ReactDOM.render(status, document.getElementById("root"));
  });
}
showTop();

/** toggles this site's state */
function toggleState() {
  const shouldShow = !status.props.isOk;
  chrome.runtime.sendMessage(
    // todo: better to "toggleWhitelist"?
    {
      task: shouldShow ? "addToWhitelist" : "removeFromWhitelist",
      name: status.props.name,
    },
    function handler(response) {
      if (!response) {
        console.log("failed to set");
      }

      showTop();  // sets status.props.isOk
    }
  );
  toggleContentBlock(shouldShow);
}

function toggleContentBlock(shouldShow) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      Message.ToggleContent(shouldShow),
      () => {}
    );
  });
}

/** show whitelists */
chrome.runtime.sendMessage(Message.WhitelistRequest, function handler(
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
