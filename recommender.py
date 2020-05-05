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
import pandas as pd

# mess around with these variables to get
# different answers
clusters = 6
hashing = True
minibatch = False
features = 5000
rows = 2000

data = pd.read_json('data_temp.json')
x = data.iloc[:, [0]].values

# print(x[1][0])

df = pd.DataFrame(columns=['journal', 'author', 'title', 'abstract'])

for i in np.arange(0, rows):
    new_title = x[i][0]['title'].replace('"', "")
    tup = {'journal': x[i][0]['journal'],
           'author': x[i][0]['authors'][0],
           #'date': x[i][0]['date'],
           'title': new_title,
           'abstract': x[i][0]['abstract']
           }
    df = df.append(tup, ignore_index=True)

arr = df.iloc[:, [0, 1, 2]].values

# we now have our dataset split into rows

# good option
if hashing:
    # Perform an IDF normalization on the output of HashingVectorizer
    hasher = HashingVectorizer(n_features=features,
                               stop_words='english', alternate_sign=False,
                               norm=None)
    vectorizer = make_pipeline(hasher, TfidfTransformer())
else:
    hasher = HashingVectorizer(n_features=features,
                               stop_words='english', alternate_sign=False,
                               norm=None)
    vectorizer = HashingVectorizer(n_features=features,
                                   stop_words='english',
                                   alternate_sign=False, norm='l2')



# vectorizer = HashingVectorizer(n_features=10000,
#                                        stop_words='english',
#                                        alternate_sign=False, norm='l2')
vectorizer1 = TfidfVectorizer(hasher)
X = vectorizer1.fit_transform(arr.ravel())

if minibatch:
    km = MiniBatchKMeans(n_clusters=clusters, init='k-means++', n_init=1,
                         init_size=1000, batch_size=1000, verbose=False)
else:
    km = KMeans(n_clusters=clusters, init='k-means++', max_iter=100, n_init=1,
                verbose=False)


km.fit(X)


# here should be where I test my code

print("Top terms per cluster:")

order_centroids = km.cluster_centers_.argsort()[:, ::-1]

terms = vectorizer1.get_feature_names()
for i in range(clusters):
    print("Cluster %d:" % (i+1), end='')
    for ind in order_centroids[i, :10]:
        print(' %s' % terms[ind], end='')
    print()

# TODO : run k-nearest neighbors to return some journals
# pred = ['AIDS', "journal", "science"]
# Y = vectorizer1.fit_transform(pred)
# print(km.predict(Y))


