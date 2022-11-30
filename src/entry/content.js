chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse({domain:document.URL})
});