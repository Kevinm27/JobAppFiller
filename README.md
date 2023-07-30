# Job Scraper

This is a project developed in a VMware Ubuntu Linux environment, using command line interface. It is designed to scrape job postings from Indeed.com, perform data analysis, and automate the application process. 

## About

Job Scraper is a Python-based tool aimed at reducing the manual work involved in job hunting. It is intended to be run on a virtual machine, specifically an Ubuntu Linux VM hosted on VMware. This tool fetches job posting data from Indeed.com, analyzes it and can be further configured to automate the application process.

The project is in progress, and more features will be added in the future.

## Setup

These instructions are for a VMware Ubuntu Linux environment.

1. Install Python:

    ```bash
    sudo apt update
    sudo apt install python3 python3-pip
    ```

2. Clone this repository:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

3. Install required Python packages:

    ```bash
    pip3 install -r requirements.txt
    ```

## Usage

Currently, this tool fetches job postings from Indeed.com. You can run the script with the command:

```bash
python3 scraper.py

