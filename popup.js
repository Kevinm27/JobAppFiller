// Prevent the default drag and drop behavior for the entire document
document.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.addEventListener('drop', function(event) {
    event.preventDefault();
});


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

document.getElementById('uploadFiles').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "uploadFiles"});
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

document.getElementById('cvInput').addEventListener('change', function() {
    const cvFile = this.files[0];
    if (cvFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            chrome.storage.sync.set({ 'savedCv': fileContent });
        };
        reader.readAsDataURL(cvFile);  // Reads the file content as Base64
    }
});

document.getElementById('coverLetterInput').addEventListener('change', function() {
    const coverLetterFile = this.files[0];
    if (coverLetterFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            chrome.storage.sync.set({ 'savedCoverLetter': fileContent });
        };
        reader.readAsDataURL(coverLetterFile);  // Reads the file content as Base64
    }
});

// Handle dragover event
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = '#e0e0e0';  // Some feedback on drag over
}

// Handle drag leave event
function handleDragLeave(event) {
    event.currentTarget.style.backgroundColor = 'transparent';
}

// Function to read the dropped file
function handleFileDrop(dropAreaId, storageKey) {
    const dropArea = document.getElementById(dropAreaId);

    dropArea.addEventListener('drop', (event) => {
        event.stopPropagation();  // Stop the event from propagating further
        event.preventDefault();   // Prevent the default action
        
        // Retrieve the file
        const file = event.dataTransfer.files[0];
        if (file) {
            // Handle the file
            const reader = new FileReader();
            reader.onload = function(event) {
                const fileContent = event.target.result;
                chrome.storage.sync.set({ [storageKey]: fileContent });
            };
            reader.readAsDataURL(file);
        }

        dropArea.style.backgroundColor = 'transparent';
    });
}


// Now, setup the listeners for the two drop areas
document.getElementById('cvDropArea').addEventListener('dragover', handleDragOver);
document.getElementById('cvDropArea').addEventListener('dragleave', handleDragLeave);
handleFileDrop('cvDropArea', 'savedCv');

// Replicate for cover letter 
document.getElementById('coverLetterDropArea').addEventListener('dragover', handleDragOver);
document.getElementById('coverLetterDropArea').addEventListener('dragleave', handleDragLeave);
handleFileDrop('coverLetterDropArea', 'savedCoverLetter');

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

