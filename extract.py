import requests
from bs4 import BeautifulSoup

def scrape_indeed(job_title, location):
	base_url = "https://www.indeed.com/jobs"
	params = {
		"q": job_title,
		"l": location
	}
	
	headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) 			Chrome/58.0.3029.110 Safari/537.36"
	}
	
	response = requests.get(base_url, params=params)
	
	if response.status_code != 200:
		print(f"Request to {base_url} failed with status code : {response.status_code}")
	soup = BeautifulSoup(response.text, 'html.parser')
	
	job_cards = soup.find_all('div', class_='jobsearch-SerpJobCard')
	
	for job_card in job_cards:
		job_title = job_card.find('a', class_='jobtitle').text.strip()
		company = job_card.find('span', class_='company').text.strip()
		location = job_card.find('div', class_='recJobLoc')['data-rc-loc']
		print(f"Job Title: {job_title}, Company: {company}, Location:{location}")
		

scrape_indeed("Software Engineer", "San Francisco")


