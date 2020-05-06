from sklearn.datasets import fetch_20newsgroups
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import Normalizer
from sklearn import metrics

from sklearn.cluster import KMeans, MiniBatchKMeans

import logging
from optparse import OptionParser
import sys
from time import time

import numpy as np
import json
import pandas as pd
from pymongo import MongoClient

# mess around with these variables to get
# different answers
clusters = 4
hashing = False
minibatch = True
features = 5000
rows = 1002

jake_vec = None
tfidf = None

client = MongoClient('localhost', 27017)
db=client.test
nosql = db.nosql

x = list(nosql.find({"word_count": {"$exists": "true"}}))
#for i in range(10):
#print(x[0])
#x = data.iloc[:, [0]].values

# print(x[1][0])

df = pd.DataFrame(columns=['title', 'authors'])

arr = []
common = ["the", "of", "to", "and", "a", "that", "is", "it", "are", "this",
          "there", "were", "be", "at", "had", "or", "as", "been"]

for i in np.arange(0, rows):

    # need to create all of the authors
    author_string = ""
    for j in range(len(x[i]['authors'])):
        author_string += (x[i]['authors'][j] + " ")

    # need to create a new string based on frequency
    abs_string = ""
    for k in x[i]['word_count']:
        if k not in common:
            for l in range(int(x[i]['word_count'][k])):
                abs_string += (k + " ")

    new_title = x[i]['title']

    final = ""
    for val in range(5):
        final += x[i]['journal'] + " " + author_string + " " + new_title + " "

    final += abs_string

    #print(final)

    arr.append(final)
    new_row = {'title': new_title, 'authors': x[i]['authors']}
    df = df.append(new_row, ignore_index=True)


#print(arr)

# we now have our dataset split into rows

# good option
if hashing:
    # Perform an IDF normalization on the output of HashingVectorizer
    vectorizer = HashingVectorizer(n_features=features,
                                   stop_words='english',
                                   alternate_sign=False, norm='l2')
else:
    vectorizer = TfidfVectorizer(max_df=0.5, max_features=features,
                                 min_df=2, stop_words='english',
                                 use_idf=True)


X = vectorizer.fit_transform(arr)

# lets do componenet analysis
# svd = TruncatedSVD(4)
# normalizer = Normalizer(copy=False)
# lsa = make_pipeline(svd, normalizer)
#
# X = lsa.fit_transform(X)


if minibatch:
    km = MiniBatchKMeans(n_clusters=clusters, init='k-means++', n_init=1,
                         init_size=1000, batch_size=1000, verbose=False)
else:
    km = KMeans(n_clusters=clusters, init='k-means++', max_iter=100, n_init=1,
                verbose=False)


km.fit(X)


# here should be where I test my code

# print("Top terms per cluster:")
#
# order_centroids = km.cluster_centers_.argsort()[:, ::-1]
#
# terms = vectorizer.get_feature_names()
# for i in range(clusters):
#     print("Cluster %d:" % (i+0), end='')
#     for ind in order_centroids[i, :10]:
#         print(' %s' % terms[ind], end='')
#     print()

# TODO : run k-nearest neighbors to return some journals
# my definiton -- medicine, science, math, engineering

with open('survey.json', 'r') as f:
    choices = json.load(f)
with open('following.json', 'r') as f:
    author_name = json.load(f)
df_labels = pd.DataFrame(km.labels_)

prediction_possibilities = ["patients dose cancer AIDS hiv dna rats youth development youth methods",
                            "chemistry dna hiv complexes surgery neurosurgery health flame heat hybrid compounds ",
                            "stat statistics energy solar field power market performance phase ",
                            "performance electrical engineering computer science renewable heat forces "]

# print(km.predict(vectorizer.transform(prediction_possibilities)))

# print(choices.head())
# print("")
# print(author_name.head())

# now i have usable json files
query_string = ""

if choices["medicine"] == 1:
    query_string += prediction_possibilities[0]
if choices["science"] == 1:
    query_string += prediction_possibilities[1]
if choices["math"] == 1:
    query_string += prediction_possibilities[2]
if choices["engineering"] == 1:
    query_string += prediction_possibilities[3]

cluster_pref = km.predict(vectorizer.transform([query_string]))
#author_pref = author_name.author_name.unique()

# this will be my only return statement
results = []
no_dup = []

df['cluster'] = df_labels

for index, row in df.iterrows():
    if row['cluster'] == cluster_pref and any(x in author_name for x in row['authors']):
        # add it to results
        value = [index, row['title'], row['authors'][0]]
        results.append(value)
        no_dup.append(value)
        if len(results) >= 10:
            break

# hopefully we do not have to get to this point
for index, row in df.iterrows():
    if row['cluster'] == cluster_pref:
        # add it to results
        value = [index, row['title'], row['authors'][0]]
        if value not in no_dup:
            results.append(value)
        if len(results) >= 10:
            break

for i in results:
    for j in i:
        print(j)
# paper_id, title
