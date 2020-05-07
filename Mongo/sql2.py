from pymongo import MongoClient
import pandas as pd
import numpy as np
import math
import json
import sqlite3

conn = sqlite3.connect('new.db')

c = conn.cursor()

c.execute('''CREATE TABLE IF NOT EXISTS Authors (
               id integer PRIMARY KEY,
               name text NOT NULL
            );''')
c.execute('''CREATE TABLE IF NOT EXISTS Recommendations (
               id integer PRIMARY KEY,
               name text NOT NULL,
               journal text NOT NULL,
               abstract text NOT NULL
            );''')

arr = pd.read_csv("out.csv", header=None)
arr.to_numpy()

print(len(arr[0]))
uni, uni_ind = np.unique(arr[0], return_index=True)

print(arr.shape)
new_arr = []

for i in range(len(uni_ind)):
    temp_arr = []
    broken = False
    for j in range(5):
        if isinstance(arr[j][uni_ind[i]], float) and math.isnan(arr[j][uni_ind[i]]):
            broken = True
            break
        temp_arr.append(arr[j][uni_ind[i]])
    #print(temp_arr)
    if broken:
        continue
    new_arr.append(temp_arr)

author_id = 0
paper_id = 0
for i in range(len(new_arr)):
    authors = new_arr[i][1].split(';')
    for j in authors:
        c.execute('''SELECT name FROM Authors WHERE name="''' + j + '''"''')
        tuples = c.fetchall()
        if len(tuples) == 0:
            c.execute('''INSERT INTO Authors(id, name)
                         VALUES('''+str(author_id)+''',"'''+j+'''")''')
        author_id += 1
    query = '''INSERT INTO Recommendations(id, name, journal, abstract)
                 VALUES(?,?,?,?)'''
    
    print(paper_id, new_arr[i])
    c.execute(query, (paper_id, new_arr[i][0], new_arr[i][2], new_arr[i][4]))

    paper_id += 1

