import requests
from bs4 import BeautifulSoup

def scrape_indeed(job_title, location):
	base_url = "https://www.indeed.com/jobs"
	params = {
		"q"": job_title
		"l": location
	}
	response = requests.get(base_url, params=params)
	soup = BeautifulSoup(response.text, 'html.parser')
	
	job_cards = soup.find_all('div', class_='jobsearch-SerpJobCard')
	
	for job_card in job_cards:
		job_title = job_card.find('a', class_='jobtitle').text.strip()
		company = job_card.find('span', class_='company').text.strip()
		location = job_card.find('div' class_='recJobLoc')['data-rc-loc']
		print(f"Job Title: {job_title}, Company: {company}, Location:{location}")
		

scrape_indeed("Software Engineer", "San Francisco")


