chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "auto_fill_form") {
            chrome.tabs.executeScript({
                file: 'content.js'
            });
        }
    }
);

