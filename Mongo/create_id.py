from pymongo import MongoClient
import pandas as pd
import numpy as np
import math
import json
import pprint
from bson.son import SON
from bson.code import Code

client = MongoClient('localhost', 27017)

db = client.test
nosql = db.nosql

result = list(nosql.find({"word_count": {"$exists": "true"}}))

id = 0
sql_data = {}
sql_data['nosql'] = []
for i in result:
    nosql.update_one({"_id": i['_id']}, {"$set": {"id": id}})
    id += 1
    for i in nosql.find({"_id": i['_id']}, {'_id': 0, 'id': 1, 'journal': 1, 'authors': 1, 'title': 1, 'abstract': 1}):
        sql_data['nosql'].append(i)

with open('data_sql.json', 'w') as file:
    json.dump(sql_data, file)
