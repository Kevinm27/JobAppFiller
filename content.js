chrome.storage.sync.get('userInfo', function(data) {
    if (data.userInfo) {
        document.querySelector('input[name="firstName"]').value = data.userInfo.firstName || '';
        document.querySelector('input[name="lastName"]').value = data.userInfo.lastName || '';
        // ... Fill other fields here using appropriate selectors ...
    }
});

function removeCommonListeners(element) {
    const events = ["click", "focus", "blur", "input", "change"];
    events.forEach(event => {
        // We don't know the actual listener functions, so this is a blanket attempt to remove all listeners of a given type.
        element.removeEventListener(event, () => {}, true);
    });
}


function tryAutoFill(data) {
    const mappings = {
        'firstName': ['firstName', 'first_name', 'userFirstName'],
        'lastName': ['lastName', 'last_name', 'userLastName'],
        'email': ['email', 'e-mail', 'userEmail'],
        'city':['city', 'City'],
        'state':['state', 'State'],
        'postalCode':['postalCode', 'Postal Code', 'PostalCode', 'zip code', 'Zip Code', 'zipCode', 'Zip', 'zip'],
        'phoneNumber': ['phoneNumber', 'Phone Number', 'PhoneNumber'],
        'address':['address', 'Address']
    };

    for (let key in mappings) {
        if (data[key]) {
            for (let name of mappings[key]) {
                let inputField = document.querySelector(`input[name="${name}"]`);
                if (inputField) {
                    inputField.value = data[key];
                    break; // We've found and set the value, move to next key
                }
            }
        }
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message === "auto_fill_form") {
	    chrome.storage.sync.get('userInfo', function(data) {
		if (data.userInfo) {
		    const fields = ['firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'email', 'phoneNumber'];
		    
		    fields.forEach(field => {
		    	setTimeout(()=>{
		 
				let inputElement = document.querySelector(`input[name="${field}"]`);
				
				if (inputElement) {
				    removeCommonListeners(inputElement);  // Call the utility function before setting value
				    inputElement.value = data.userInfo[field] || '';
				}
		        }, 6000);
		    });
		}
	    });
	}
});


