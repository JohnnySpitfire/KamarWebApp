from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import getpass
import psycopg2
import bcrypt

programFunc = input('Do you wish to update a user or initialise a new user? I/U: ')

if programFunc.lower() == 'i':
    usernameInput = input('please enter your student id: ')
    fullNameInput = input('please enter your full name: ')
    nsnInput = input('please enter your nsn: ')
    levelInput = input('please enter your NCEA level as a number: ')
    passwordInput = getpass.getpass()
    email = f'{usernameInput}@trinityschools.nz'
    levelInput = int(levelInput)
    if len(nsnInput) == 10:
        nsnInput = nsnInput[1:]

if programFunc.lower() == 'u':
    usernameInput = input('please enter your student id: ')
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

level3DataRaw = []
level2DataRaw = []
level1DataRaw = []

level3DataRawJSON = []
level2DataRawJSON = []
level1DataRawJSON = []

level3DataSerialised = []
level2DataSerialised = []
level1DataSerialised = []

level3DataSerialisedJSON = []
level2DataSerialisedJSON = []
level1DataSerialisedJSON = []

for data in level3:
    numberRaw = data.find('td', class_='result-credits').get_text()
    numberSerialised = int(numberRaw[0])
    titleTags = data.findAll('td', class_='result_title')
    for tag in titleTags:
        title = tag.find('b').get_text()
        comment = tag.get_text().replace(title, '')
    valueRaw = data.find('td', class_='result-value').get_text()
    valueSerialised = valueRaw.split()[-1][0]
    if 'Not' in valueRaw:
        valueSerialised = 'N'
    level3DataRawJSON.extend([{'title': title, 'comment': comment, 'number': numberRaw, 'value': valueRaw}])
    level3DataSerialisedJSON.extend([{'title': title, 'number': numberSerialised, 'value': valueSerialised}])
    level3DataRaw.extend([[title, comment, numberRaw, valueRaw]])
    level3DataSerialised.extend([[title, numberSerialised, valueSerialised]])


for data in level2:
    numberRaw = data.find('td', class_='result-credits').get_text()
    numberSerialised = int(numberRaw[0])
    titleTags = data.findAll('td', class_='result_title')
    for tag in titleTags:
        title = tag.find('b').get_text()
        comment = tag.get_text().replace(title, '')
    valueRaw = data.find('td', class_='result-value').get_text()
    valueSerialised = valueRaw.split()[-1][0]
    if 'Not' in valueRaw:
        valueSerialised = 'N'
    level2DataRawJSON.extend([{'title': title, 'comment': comment, 'number': numberRaw, 'value': valueRaw}])
    level2DataSerialisedJSON.extend([{'title': title, 'number': numberSerialised, 'value': valueSerialised}])
    level2DataRaw.extend([[title, comment, numberRaw, valueRaw]])
    level2DataSerialised.extend([[title, numberSerialised, valueSerialised]])

for data in level1:
    numberRaw = data.find('td', class_='result-credits').get_text()
    numberSerialised = int(numberRaw[0])
    titleTags = data.findAll('td', class_='result_title')
    for tag in titleTags:
        title = tag.find('b').get_text()
        comment = tag.get_text().replace(title, '')
    valueRaw = data.find('td', class_='result-value').get_text()
    valueSerialised = valueRaw.split()[-1][0]
    if 'Not' in valueRaw:
        valueSerialised = 'N'
    level1DataRawJSON.extend([{'title': title, 'comment': comment, 'number': numberRaw, 'value': valueRaw}])
    level1DataSerialisedJSON.extend([{'title': title, 'number': numberSerialised, 'value': valueSerialised}])
    level1DataRaw.extend([[title, comment, numberRaw, valueRaw]])
    level1DataSerialised.extend([[title, numberSerialised, valueSerialised]])


DataRawJsonArray = [level3DataRawJSON, level2DataRawJSON, level1DataRawJSON]
DataSerialisedJsonArray = [level3DataSerialisedJSON, level2DataSerialisedJSON, level1DataSerialisedJSON]

DataRawJSON = json.dumps(DataRawJsonArray)
DataSerialisedJSON = json.dumps(DataSerialisedJsonArray)

conn = psycopg2.connect("dbname=kamar_web_app user=postgres password=l1Thyrus")
#
# # Open a cursor to perform database operations
cur = conn.cursor()
if programFunc.lower() == 'i':
    password = fullNameInput.split(' ')[0] + '1'
    password = bytes(password, 'utf-8')
    passwordHash = bcrypt.hashpw(password, bcrypt.gensalt(10))

    passwordHash = passwordHash.decode()

    cur.execute(f"INSERT INTO login (username, hash) VALUES ('{usernameInput}','{passwordHash}')")

    cur.execute(f"INSERT INTO users_submittedassesments (nsn, submittedassesmentsraw, submittedassesmentsserialised) "
                f"VALUES ('{nsnInput}','{DataRawJSON}','{DataSerialisedJSON}')")
    #
    cur.execute(f"INSERT INTO users (username, name, email, nsn, subjects, level) "
                f"VALUES ('{usernameInput}','{fullNameInput}','{email}','{nsnInput}',"
                f"ARRAY['Calculus','Biology','DigitalTechnologies','Physics','Chemistry'],"
                f"{levelInput})")

    cur.execute(f"INSERT INTO users_nceaoverview (nsn) VALUES ('{nsnInput}')")

if programFunc.lower() == 'u':
    cur.execute(f"SELECT nsn FROM users WHERE username = '{usernameInput}'")
    nsnDatabase = str(cur.fetchall()[0])[2:-3]
    cur.execute(f"UPDATE users_submittedassesments "
                f"SET submittedassesmentsraw = '{DataRawJSON}', submittedassesmentsserialised = '{DataSerialisedJSON}' "
                f"WHERE nsn = '{nsnDatabase}'")


# # Make the changes to the database persistent
conn.commit()
#
# # Close communication with the database
cur.close()
conn.close()

driver.close()
