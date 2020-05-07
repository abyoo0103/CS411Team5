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

pipeline = [
        {"$unwind": "$authors"},
        {"$group": {"_id": "$authors", "count": {"$sum": 1}}},
        {"$match": {"count": {"$gt": 2}}},
        {"$project": { "_id": 0, "authorName": "$_id"}}]
authors = list(nosql.aggregate(pipeline))

count = 0
dict = {}
new_data = {}
new_data['nosql'] = []

print(len(authors))
#db.temp.drop()

k = 0
sql_data = {}
sql_data['nosql'] = []
auth_dict = {}
auth_id = 0

for i in authors:
    if k > 1000:
        break

    author = i['authorName']
    print(author)
    if author[0] != 'A' or (author[3] != 'A' and author[3] != 'B' and author[3] != 'C'):
        continue

    auth_id += 1
    #pipe2 = [
    #        {"$unwind": "$authors"},
    #        {"$match": {"authors": author}},
    #       {"$project": {"_id": 0, "abstract": 1}}]
    #titles = (list(nosql.aggregate(pipe2)))

    #temp = db.temp
    #for i in titles:
    #    id = temp.insert_one(i)

    map = Code("function() {"
               "  var common = ['a', 'an', 'and', 'but', 'the', 'it', 'its', 'they', 'them', 'their', "
               "                'he', 'his', 'him', 'she', 'her', 'is', 'are', 'was', 'were', 'will', 'be', "
               "                'have', 'this', 'these', 'or', 'from', 'about', 'there', 'which', 'that', " 
               "                'many', 'some', 'not', 'for', 'of', 'on', 'in', 'would', '.', 'to', 'those', "
               "                'we', 'when', 'with', 'very', 'to', 'am', 'by', 'without', 'analyze', "
               "                'understand', 'cause', 'us', 'our', 'only', 'can', 'cannot', 'has']; "
               "  if(this.abstract == null){"
               "    var i = 0;"
               "  }"
               "  else{"
               "    var abs = this.abstract.toLowerCase().match(/\w+/g);"
               "    if(abs != null){ "
               "      for(var i = 0; i < abs.length; i++){ "
               "        if(!common.includes(abs[i]) && (abs[i][0] < '0' || abs[i][0] > '9')) {"
               "          emit(abs[i], 1); "
               "        } "
               "      }"
               "    }"
               "  } "
               "}")

    reduce = Code("function (key, values) {"
                  "  var total = 0;"
                  "  for (var i = 0; i < values.length; i++) {"
                  "     total += values[i];"
                  "  }"
                  "  return total;"
                  "}")

    result = db.nosql.map_reduce(map, reduce, "results", query={'authors.0': author})
    word_count = {}
    for j in result.find():
        word_count[j['_id']] = j['value']

    dict[author] = word_count

    id = db.nosql.update_many({'authors.0': author}, {'$set': {'word_count': word_count}})
    first = True
    for i in db.nosql.find({'authors.0': author},{'_id': 0, 'journal': 1, 'authors': 1, 'title': 1, 'word_count': 1}):
        if first:
            auth_dict[auth_id] = author
            auth_id += 1
            first = False
        k += 1
        new_data['nosql'].append(i)
        print(k, i)
    for i in db.nosql.find({'authors.0': author}, {'_id': 0, 'journal': 1, 'authors': 1, 'title': 1, 'abstract': 1}):
        sql_data['nosql'].append(i)
    #db.temp.drop()

with open('data_new.json', 'w') as file:
    json.dump(new_data, file)

with open('data_sql.json', 'w') as file:
    json.dump(sql_data, file)

with open('authors.json', 'w') as file:
    json.dump(auth_dict, file)
