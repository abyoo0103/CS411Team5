from pymongo import MongoClient
import pandas as pd
import numpy as np
import math
import json

client = MongoClient('localhost', 27017)

db = client.test2
nosql = db.nosql

f = open('data_temp.json',)
data = json.load(f)

for i in data['nosql']:
    id = nosql.insert_one(i).inserted_id
    #print(id)

f.close()
