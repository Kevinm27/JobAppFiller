chrome.storage.sync.get('userInfo', function(data) {
    if (data.userInfo) {
        document.querySelector('input[name="firstName"]').value = data.userInfo.firstName || '';
        document.querySelector('input[name="lastName"]').value = data.userInfo.lastName || '';
        // ... Fill other fields here using appropriate selectors ...
    }
});

