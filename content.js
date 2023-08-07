chrome.storage.sync.get('userInfo', function(data) {
    if (data.userInfo) {
        document.querySelector('input[name="firstName"]').value = data.userInfo.firstName || '';
        document.querySelector('input[name="lastName"]').value = data.userInfo.lastName || '';
        // ... Fill other fields here using appropriate selectors ...
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received in content.js:", request);
    // ... the rest of your message handling code ...
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received in content.js:", request);

    if (request.message === "auto_fill_form") {
        chrome.storage.sync.get('userInfo', function(data) {
            if (data.userInfo) {
                // Find form fields on the webpage and fill them
                let inputFirstName = document.querySelector('input[name="firstName"]');
                if (inputFirstName) inputFirstName.value = data.userInfo.firstName;

                let inputLastName = document.querySelector('input[name="lastName"]');
                if (inputLastName) inputLastName.value = data.userInfo.lastName;
                
                let inputAddress = document.querySelector('input[name="address"]');
                if (inputAddress) inputAddress.value = data.userInfo.address;

                // And so on for city, state, postalCode, email, phoneNumber...
                let inputCity = document.querySelector('input[name="city"]');
                if (inputCity) inputCity.value = data.userInfo.city;
                
                let inputState = document.querySelector('input[name="state"]');
                if (inputState) inputState.value = data.userInfo.state;
                
                let inputPostalCode = document.querySelector('input[name="PostalCode"]');
                if (inputPostalCode) inputPostalCode.value = data.userInfo.postalCode;
                
                let inputEmail = document.querySelector('input[name="email"]');
                if (inputEmail) inputEmail.value = data.userInfo.email;
                
                let inputPhoneNumber = document.querySelector('input[name="phoneNumber"]');
                if (inputPhoneNumber) inputPhoneNumber.value = data.userInfo.phoneNumber;
            }
        });
    }
});

