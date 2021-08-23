from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import getpass

usernameInput = input('please enter your username: ')
passwordInput = getpass.getpass()

driver = webdriver.Firefox(executable_path='./geckodriver.exe')

wait = WebDriverWait(driver, 10)

driver.get("https://portal.rathkeale.school.nz")
username = driver.find_element_by_id('login-username')
password = driver.find_element_by_id('login-password')
username.send_keys(usernameInput)
password.send_keys(passwordInput)
username.submit()
password.submit()

resultsButton = wait.until(EC.element_to_be_clickable((By.ID, "nav2")))
resultsButton.click()

ncea_summary = wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "NCEA Summary")))
ncea_summary.click()

html = driver.page_source

soup = BeautifulSoup(html, 'html.parser')

tablesResult = soup.findAll('tbody')

tableData = []
for table in tablesResult:
    tableData.extend(table.findAll('tr'))

level3 = tablesResult[6].findAll('tr', class_='')
level2 = tablesResult[7].findAll('tr', class_='')
level1 = tablesResult[8].findAll('tr', class_='')

level3dataRaw = []
level2dataRaw = []
level1dataRaw = []

level3dataShrunk = []
level2dataShrunk = []
level1dataShrunk = []

for data in level3:
    numberRaw = data.find('td', class_='result-credits').get_text()
    numberShrunk = int(numberRaw[0])
    titletags = data.findAll('td', class_='result_title')
    for tag in titletags:
        title = tag.find('b').get_text()
        comment = tag.get_text().replace(title, '')
    valueRaw = data.find('td', class_='result-value').get_text()
    valueShrunk = valueRaw.split()[-1][0]
    if 'Not' in valueRaw:
        valueShrunk = 'N'
    level3dataRaw.extend([{'title': title, 'comment': comment, 'number': numberRaw, 'value': valueRaw}])
    level3dataShrunk.extend([{'title': title, 'number': numberShrunk, 'value': valueShrunk}])


for data in level2:
    numberRaw = data.find('td', class_='result-credits').get_text()
    numberShrunk = int(numberRaw[0])
    titletags = data.findAll('td', class_='result_title')
    for tag in titletags:
        title = tag.find('b').get_text()
        comment = tag.get_text().replace(title, '')
    valueRaw = data.find('td', class_='result-value').get_text()
    valueShrunk = valueRaw.split()[-1][0]
    if 'Not' in valueRaw:
        valueShrunk = 'N'
    level2dataRaw.extend([{'title': title, 'comment': comment, 'number': numberRaw, 'value': valueRaw}])
    level2dataShrunk.extend([{'title': title, 'number': numberShrunk, 'value': valueShrunk}])


for data in level1:
    numberRaw = data.find('td', class_='result-credits').get_text()
    numberShrunk = int(numberRaw[0])
    titletags = data.findAll('td', class_='result_title')
    for tag in titletags:
        title = tag.find('b').get_text()
        comment = tag.get_text().replace(title, '')
    valueRaw = data.find('td', class_='result-value').get_text()
    valueShrunk = valueRaw.split()[-1][0]
    if 'Not' in valueRaw:
        valueShrunk = 'N'
    level1dataRaw.extend([{'title': title, 'comment': comment, 'number': numberRaw, 'value': valueRaw}])
    level1dataShrunk.extend([{'title': title, 'number': numberShrunk, 'value': valueShrunk}])


DataRawJsonArray = [level3dataRaw, level2dataRaw, level1dataRaw]
DataShrunkJsonArray = [level3dataShrunk, level2dataShrunk, level1dataShrunk]

DataRawJson = json.dumps(DataRawJsonArray)
DataShrunkJson = json.dumps(DataShrunkJsonArray)

name = input('Please enter your full name: ')

DataRawJsonFile = open(f'DataRawJson{name}.json', 'w')
DataShrunkJsonFile = open(f'DataShrunkJson{name}.json', 'w')

DataRawJsonFile.write(DataRawJson)
DataShrunkJsonFile.write(DataShrunkJson)

driver.close()