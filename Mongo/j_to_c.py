import json
import csv
import random

users = ['user1', 'user2', 'user3', 'test']
with open('data_sql.csv', 'r') as csvfile ,open('recs.csv', 'w') as recs:
    for line in csvfile:
        array = line.split(',')
        csvw = csv.writer(recs)
        rand_num = random.randrange(4)
        csvw.writerow([array[0], array[1], users[rand_num]])
