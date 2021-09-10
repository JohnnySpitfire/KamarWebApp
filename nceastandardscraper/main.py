from bs4 import BeautifulSoup
import urllib.request
import json
import psycopg2

conn = psycopg2.connect("dbname=kamar_web_app user=postgres password=l1Thyrus")
cur = conn.cursor()

subjectList = [{'url': 'English', 'name': 'english'},
               {'url': 'Art+History', 'name': 'art-history'},
               {'url': 'Drama', 'name': 'drama'},
               {'url': 'Calculus', 'name': 'calculus'},
               {'url': 'Mathematics', 'name': 'mathematics'},
               {'url': 'Statistics', 'name': 'statistics'},
               {'url': 'Chemistry', 'name': 'chemistry'},
               {'url': 'Biology', 'name': 'biology'},
               {'url': 'Physics', 'name': 'physics'},
               {'url': 'Classical+Studies', 'name': 'classics'},
               {'url': 'History', 'name': 'history'},
               {'url': 'Geography', 'name': 'geography'},
               {'url': 'Business+Studies', 'name': 'business-studies'},
               {'url': 'Economics', 'name': 'economics'},
               {'url': 'Digital+Technologies', 'name': 'digital-technologies'},
               {'url': 'Design+and+Visual+Communication', 'name': 'design-visual-communication'},
               {'url': 'Technology', 'name': 'technology'}]
levels = ['03', '02', '01']

allStandards = []
for subject in subjectList:
    print('------------------------------')
    print(subject['url'], 'started!')
    subjectStandards = {'level1': [], 'level2': [], 'level3': []}
    for level in levels:
        url = f"https://www.nzqa.govt.nz/ncea/assessment/search.do?query={subject['url']}&view=all&level={level}"
        html = urllib.request.urlopen(url, timeout=180)
        soup = BeautifulSoup(html, 'html.parser')
        tablesResult = soup.findAll('tr', class_='dataHighlight')
        levelStandards = []
        for standard in tablesResult:
            data = (standard.findAll('td'))
            standard = []
            for tag in data:
                text = tag.get_text()
                standard.append(text.strip())
            standard[2] = standard[2][0]
            standard[1] = standard[1].replace("'", '')
            if '(expiring)' in standard[0]:
                pass
            elif standard[0][0] != '9' or len(standard[0]) != 5:
                pass
            else:
                levelStandards.append(standard)
        subjectStandards.update({f"level{level[1]}": levelStandards})
        print('level', level[1], 'finished!')
    allStandards.append(subjectStandards)
    print(subject['name'], 'completed!')
    subjectStandardsJSON = json.dumps(subjectStandards)
    cur.execute(f"UPDATE subjects SET standards = '{subjectStandardsJSON}' WHERE name = '{subject['name']}'")

conn.commit()
cur.close()
conn.close()


