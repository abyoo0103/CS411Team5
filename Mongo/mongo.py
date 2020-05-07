from pymongo import MongoClient
import pandas as pd
import numpy as np
import math
import json

client = MongoClient('localhost', 27017)

db = client.test
nosql = db.nosql

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

data = {}
data['nosql'] = []
for i in range(len(new_arr)):
    #print(new_arr[i][1])
    authors = new_arr[i][1].split(';')
    entry = {"title": new_arr[i][0],
             "authors": authors,
             "journal": new_arr[i][2],
             "date": new_arr[i][3],
             "abstract": new_arr[i][4]}
    print(entry)
    data['nosql'].append(entry)
    #id = nosql.insert_one(entry).inserted_id
    #print(id)

with open('data.json', 'w') as file1:
    json.dump(data, file1)
