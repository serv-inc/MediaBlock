chrome.runtime.onMessage.addListener(isOk);

function isOk(request, sender, sendResponse) {
  const u = new URL(sender.url);
  sendResponse({ task: "isOk", data: { name: u.host, isOk: true } });
}
