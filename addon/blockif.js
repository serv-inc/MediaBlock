"use strict";
/* jshint esversion: 6, strict: global */
/* globals chrome */
/* globals document */
/* globals location */
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

let whitelist = RegExp("google.*newtab|google.*source[^\/]*url");

chrome.storage.managed.get("whitelist", function(result) {
  if ( "whitelist" in result ) {
    whitelist = RegExp(whitelist + "|" + result.whitelist);
  }
  hideIf();
});


function hideIf() {
  if ( ! whitelist.test(window.top.location.href) ) {
    addStyleRule();
  }
}

function addStyleRule() {
  let style = document.querySelector("style");
  if ( style === null ) {
    style = document.createElement("style");
    document.head.appendChild(style);
  }
  style.innerHTML += HIDE_STYLE;
}

