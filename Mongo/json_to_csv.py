import json
import csv

with open('data_sql.json', 'r') as file:
    json_file = json.load(file)

with open('data_sql.csv', 'w') as csvfile:
    for i in json_file['nosql']:
        csvw = csv.writer(csvfile)
        auth_str = ''
        for j in range(len(i['authors'])):
            auth_str += (i['authors'][j])
            if j < len(i['authors']) - 1:
                auth_str += ';'
        csvw.writerow([i['id'], i['title'], auth_str, i['journal'], i['abstract']])
