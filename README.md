# Auto-Fill Assistant

This is a project developed as a Chrome browser extension. It is designed to auto-fill job application forms with the user's details and, if possible, upload required documents.

## About

Auto-Fill Assistant is a tool aimed at reducing the manual work involved in filling out job applications online. This extension fetches user-provided details from a popup window and auto-fills them into the corresponding fields on the webpage. The user can easily review and modify the data before submitting the application.

The project is in progress, and more features will be added in the future, including potentially automating parts of the document upload process.

## Setup

These instructions are for installing and running the extension in Google Chrome.

1. Clone this repository:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Load the extension into Chrome:

   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select your extension's folder

## Usage

Currently, this tool can fill in details such as first name, last name, address, zip code, city, phone number/mobile number, resume, cover letter, and other specific fields related to employment and education. The user can interact with the extension through a simple popup window, entering or reviewing the data to be filled into the form.

Once the extension is loaded, simply navigate to the webpage with the job application form, open the Auto-Fill Assistant popup, and use the provided buttons to save your data or fill the form.

## Future Work

- Enhancing the user interface for improved usability.
- Adding support for file uploads for resumes and cover letters.
- Extending compatibility to other browsers.
- Automating more parts of the application process.

