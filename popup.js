document.getElementById('saveData').addEventListener('click', function() {
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        postalCode: document.getElementById('postalCode').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };
    chrome.storage.sync.set({userInfo: data}, function() {
        console.log('User information saved.');
    });
});

document.getElementById('fillForm').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0];
        if(activeTab.status === "complete") {
            chrome.tabs.sendMessage(activeTab.id, {"message": "auto_fill_form"});
        } else {
            console.warn("Tab is not fully loaded yet. Wait for a moment and try again.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('userInfo', function(data) {
        if (data.userInfo) {
            //data from inputted fields
            document.getElementById('firstName').value = data.userInfo.firstName || '';
            document.getElementById('lastName').value = data.userInfo.lastName || '';
            document.getElementById('address').value = data.userInfo.address || '';
            document.getElementById('city').value = data.userInfo.city || '';
            document.getElementById('state').value = data.userInfo.state || '';
            document.getElementById('postalCode').value = data.userInfo.postalCode || '';
            document.getElementById('email').value = data.userInfo.email || '';
            document.getElementById('phoneNumber').value = data.userInfo.phoneNumber || '';
            
            //saved information below
            document.getElementById('savedFirstName').textContent = data.userInfo.firstName || 'Not Saved';
      	    document.getElementById('savedLastName').textContent = data.userInfo.lastName || 'Not Saved';
      	    document.getElementById('savedAddress').textContent = data.userInfo.address || 'Not Saved';
      	    document.getElementById('savedCity').textContent = data.userInfo.city || 'Not Saved';
      	    document.getElementById('savedState').textContent = data.userInfo.state || 'Not Saved';
      	    document.getElementById('savedPostalCode').textContent = data.userInfo.postalCode || 'Not Saved';
      	    document.getElementById('savedEmail').textContent = data.userInfo.email || 'Not Saved';
     	    document.getElementById('savedPhoneNumber').textContent = data.userInfo.phoneNumber || 'Not Saved';
        }
    });
});

document.getElementById('viewData').addEventListener('click', function() {
    document.getElementById('newDataSection').style.display = 'none';
    document.getElementById('savedDataSection').style.display = 'block';
});

document.getElementById('enterData').addEventListener('click', function() {
    document.getElementById('savedDataSection').style.display = 'none';
    document.getElementById('newDataSection').style.display = 'block';
});

document.getElementById('editData').addEventListener('click', function() {
    document.getElementById('savedDataSection').style.display = 'none';
    document.getElementById('newDataSection').style.display = 'block';
});

