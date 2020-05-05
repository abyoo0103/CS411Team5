import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import mpl_toolkits
from sklearn import metrics

train = pd.read_csv('train.csv')
feat = ['epochs', 'number_parameters']
feat2 = list()  # ['epochs', 'number_parameters']
for i in range(50):
    feat.append('train_accs_' + str(i))
    feat.append('train_losses_' + str(i))
    feat.append('val_accs_' + str(i))
    feat.append('val_losses_' + str(i))
    feat2.append('val_accs_' + str(i))
    feat2.append('val_losses_' + str(i))

my_train = train[feat]
my_labels = train[['train_error']]

my_labels2 = train[['val_error']]
my_train2 = train[feat2]
# test = pd.read_csv('test.csv')
# my_test = test[['epochs', 'number_parameters']]
# my_test_labels = test[['val_error']]

# from sklearn.cross_validation import train_test_split
msk = np.random.rand(len(train)) < 0.8
y_train = my_labels[msk]
y_test = my_labels[~msk]
x_train = my_train[msk]
x_test = my_train[~msk]

y_train2 = my_labels2[msk]
y_test2 = my_labels2[~msk]
x_train2 = my_train2[msk]
x_test2 = my_train2[~msk]
# x_train , x_test , y_train , y_test = train_test_split(my_train , my_labels , test_size = 0.10,random_state =2)

from sklearn import ensemble

clf = ensemble.GradientBoostingRegressor(n_estimators=3000, max_depth=6,
                                         learning_rate=0.15, min_samples_split=3)
clf2 = ensemble.GradientBoostingRegressor(n_estimators=3000, max_depth=6,
                                          learning_rate=0.15, min_samples_split=3)
# clf3 = ensemble.GradientBoostingRegressor(n_estimators = 3000, max_depth = 6,
#          learning_rate = 0.15, min_samples_split=3)
# clf3 = ensemble.RandomForestRegressor(n_estimators = 100)


clf.fit(x_train, y_train)
val = clf.score(x_test, y_test)
print(val)
y_pred = clf.predict(x_test)
# print('Mean Absolute Error:', metrics.mean_absolute_error(y_test, y_pred))
# print('Mean Squared Error:', metrics.mean_squared_error(y_test, y_pred))
# print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_test, y_pred)))
# print('R^2', metrics.r2_score(y_test, y_pred))


clf2.fit(x_train2, y_train2)
val2 = clf2.score(x_test2, y_test2)
print(val2)

# clf3.fit(x_train2, y_train2)
# val3 = clf3.score(x_test2, y_test2)
# print(val3)

# y_pred2 = clf2.predict(x_test2)
# print('Mean Absolute Error:', metrics.mean_absolute_error(y_test2, y_pred2))
# print('Mean Squared Error:', metrics.mean_squared_error(y_test2, y_pred2))
# print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_test2, y_pred2)))
# print('R^2', metrics.r2_score(y_test2, y_pred2))