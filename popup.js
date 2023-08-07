document.getElementById('saveData').addEventListener('click', function() {
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        // ... collect data from other fields similarly ...
    };
    chrome.storage.sync.set({userInfo: data}, function() {
        console.log('User information saved.');
    });
});

document.getElementById('fillForm').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "auto_fill_form"});
    });
});


document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('userInfo', function(data) {
        if (data.userInfo) {
            document.getElementById('firstName').value = data.userInfo.firstName || '';
            document.getElementById('lastName').value = data.userInfo.lastName || '';
            // ... Load other fields here ...
        }
    });
});

