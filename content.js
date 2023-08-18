// Utility function to simulate user input
function setInputValue(inputElement, value) {
    const event = new Event('input', { 'bubbles': true });
    inputElement.value = value;
    inputElement.dispatchEvent(event);
}

const mappings = {
    'firstName': ['firstName', 'first_name', 'userFirstName'],
    'lastName': ['lastName', 'last_name', 'userLastName'],
    'email': ['email', 'e-mail', 'userEmail', 'username'],
    'city': ['city', 'City'],
    'state': ['state', 'State'],
    'postalCode': ['postalCode', 'Postal Code', 'PostalCode', 'zip code', 'Zip Code', 'zipCode', 'Zip', 'zip'],
    'phoneNumber': ['phoneNumber', 'Phone Number', 'PhoneNumber', 'mobileNumber', 'Mobile Number'],
    'address': ['address', 'Address', 'streetAddress']
};
const fieldToSelectorMap = {
    'firstName': 'input[name="firstName"]',
    'lastName': 'input[name="lastName"]',
    'address': 'input[name="address"]',
    'city': 'input[name="city"]',
    'state': 'input[name="state"]',
    'postalCode': 'input[name="postalCode"], input[name="Postal Code"], input[name="zip"], input[name="Zip Code"], input[name="zipCode"]',
    'email': 'input[type="email"], input[name="email"], input[name="e-mail"]',
    'phoneNumber': 'input[type="phone"], input[placeholder="Phone Number"]'
};

function removeCommonListeners(element) {
    const events = ["click", "focus", "blur", "input", "change"];
    events.forEach(event => {
        element.removeEventListener(event, () => {}, true);
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message === "uploadFiles"){
		 chrome.storage.sync.get(['savedCv', 'savedCoverLetter'], function(data) {
		    if (data.savedCv || data.savedCoverLetter) {
		        const cvInput = document.querySelector('input[type="file"][name*="cv"], input[type="file"][name*="resume"]');
		        const coverLetterInput = document.querySelector('input[type="file"][name*="cover"], input[type="file"][name*="letter"]');
		        
		        if (cvInput && data.savedCv) {
		            setFileForInput(cvInput, dataUriToFile(data.savedCv, 'cv.pdf'));  // Assuming pdf, modify accordingly
		        }

		        if (coverLetterInput && data.savedCoverLetter) {
		            setFileForInput(coverLetterInput, dataUriToFile(data.savedCoverLetter, 'coverLetter.pdf'));  // Assuming pdf, modify accordingly
		        }
		    }
		 }
        });
    else if (request.message === "auto_fill_form") {
        chrome.storage.sync.get('userInfo', function(data) {
            if (data.userInfo) {
                const fields = ['firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'email', 'phoneNumber'];
                
                fields.forEach(field => {
                    
                let inputElement;

                // First, try to locate the field based on the naming conventions in the mappings object.
                if (mappings[field]) {
                    for (let name of mappings[field]) {
                        inputElement = document.querySelector(`input[name="${name}"]`);
                        if (inputElement) break; // Found a matching field, exit the loop.
                    }
                }

                // If the field wasn't found using the mappings object, fall back to the fieldToSelectorMap.
                if (!inputElement) {
                    inputElement = document.querySelector(fieldToSelectorMap[field]);
                }

                if (inputElement) {
                    removeCommonListeners(inputElement);
                    setInputValue(inputElement, data.userInfo[field] || '');
                }
                    
                });
            }
        });
    }
    return true;
});


function setFileForInput(inputElement, file) {
    const dt = new DataTransfer();
    dt.items.add(file);
    inputElement.files = dt.files;
}

/**
 * Convert a Data URI to a File object.
 * @param {string} dataUri - The data URI to convert.
 * @param {string} fileName - The name for the resulting file.
 * @returns {File} - A File object.
 */
function dataUriToFile(dataUri, fileName) {
    // Split the Data URI into parts.
    const [header, base64] = dataUri.split(',');

    // Decode the Base64 data.
    const byteString = atob(base64);

    // Get the MIME type.
    const mimeTypeMatch = header.match(/:(.*?);/);
    const mimeType = (mimeTypeMatch && mimeTypeMatch[1]) || '';

    // Convert the Base64 decoded string to a Uint8Array.
    const uint8Array = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create a new Blob from the Uint8Array and set its MIME type.
    const blob = new Blob([uint8Array], { type: mimeType });

    // Return the Blob as a File object with the specified name.
    return new File([blob], fileName);
}

