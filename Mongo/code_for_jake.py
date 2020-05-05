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

for i in result:
    print(i)
