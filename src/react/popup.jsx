"use strict";
/* globals chrome */
// licensed under the MPL 2.0 by (github.com/serv-inc)
/** @fileinfo: show browser action popup */
function showTop() {
  chrome.runtime.sendMessage({ task: "isOk" }, function handler(response) {
    const element = (
      <CurrentPage name={response.data.name} isOk={response.data.isOk} />
    );

    ReactDOM.render(element, document.getElementById("root"));
  });
}
showTop();

chrome.runtime.sendMessage({ task: "getWhitelist" }, function handler(
  response
) {
  const managed = <Whitelist list={response.data.managed} />;

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

function CurrentPage(prop) {
  function onClick(event) {
    event.preventDefault();
    chrome.runtime.sendMessage(
      { task: "addToWhitelist", addthis: prop.name },
      function handler(response) {
        if (!response) {
          console.log("failed to set");
        }
        showTop();
      }
    );
  }

  return (
    <div>
      <p>
        {prop.name} is {prop.isOk ? "good" : "bad"} company
      </p>
      <button onClick={onClick}>toggle</button>
    </div>
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
