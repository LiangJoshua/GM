# All the packages we will be using
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sb
from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn.svm import SVR
from sklearn import neighbors
from sklearn.model_selection import cross_val_score
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from operator import itemgetter
plt.style.use('fivethirtyeight')

# Import NBA stats datasets
stats_2017 = pd.read_csv('data/2017_season.csv')
stats_2018 = pd.read_csv('data/2018_season.csv')


stats_2017 = stats_2017[['Player', 'Pos_x','G_x','MP_x','PS/G','AST','TRB','3P%','FG%','FT%','eFG%','VORP','TS%','BPM','PER','WS']]
stats_2018 = stats_2018[['Player', 'Pos_x','G_x','MP_x','PS/G','AST','TRB','3P%','FG%','FT%','eFG%','VORP','TS%','BPM','PER','WS']]

stats_2017.columns = ['Player', 'Pos','G','MP','PS/G','AST','TRB','3P%','FG%','FT%','eFG%','VORP','TS%','BPM','PER','WS']
stats_2018.columns = ['Player', 'Pos','G','MP','PS/G','AST','TRB','3P%','FG%','FT%','eFG%','VORP','TS%','BPM','PER','WS']


ws_2018 = stats_2018[['Player', 'WS']]

#Win Shares Distribution
plt.figure(figsize = (15,8))
plt.hist(stats_2017['WS'], bins = 15)
plt.xlabel('Win Shares', size = 15)
plt.ylabel('Number of Players', size = 15)
plt.title('Win Shares Distribution', size = 20);
plt.show(block=True)

stats_2017 = stats_2017[stats_2017['G'] > 30]
stats_2018 = stats_2018[stats_2018['G'] > 30]

stats_2017 = stats_2017[stats_2017['MP'] > 25]
stats_2018 = stats_2018[stats_2018['MP'] > 25]

plt.figure(figsize = (15,8))
plt.hist(stats_2017['WS'], bins = 15)
plt.xlabel('Win Shares', size = 15)
plt.ylabel('Number of Players', size = 15)
plt.title('Win Shares Distribution', size = 20);
plt.show(block=True)

# Correlation between Win Shares and features
corr_2017 = stats_2017.corr()['WS'].reset_index()
corr_2017 = corr_2017.sort_values([('WS')], ascending = False)
print(corr_2017)

corr_2018 = stats_2018.corr()['WS'].reset_index()
corr_2018 = corr_2018.sort_values([('WS')], ascending = False)
print(corr_2018)
#Searching for correlation between features
stats_2017_corr = stats_2017[['Player','Pos','PS/G','TS%','TRB','VORP','BPM','MP','PER','eFG%','FG%']]


def feature_corr(x, y, **kwargs):
    cor = np.corrcoef(x, y)[0][1]
    ax = plt.gca()
    ax.annotate("r = {:.2f}".format(cor),
                xy=(.5, .1),
                xycoords=ax.transAxes,
                size = 23)


plots = sb.PairGrid(stats_2017_corr)
plots.map(plt.scatter)
plots.map(feature_corr);
plt.show(block=True)

# Create the train test datasets
train, test = train_test_split(stats_2017, test_size=0.25, random_state=99)

x_train = train[['PS/G','TS%','TRB','VORP','PER','MP']]
y_train = train[['WS']]

x_test = test[['PS/G','TS%','TRB','VORP','PER','MP']]
y_test = test[['WS']]

# Create the Linear Regression model
linReg = linear_model.LinearRegression()
linReg.fit(x_train, y_train)

linReg.predict(x_test)

y_lin_pred = linReg.predict(x_test)

print('Score: %.3f' % linReg.score(x_train, y_train))
print('Mean squared error: %.3f' % mean_squared_error(y_test, y_lin_pred))
print('Mean Absolute error: %.3f' % mean_absolute_error(y_test, y_lin_pred))
print('Variance score: %.3f' % r2_score(y_test, y_lin_pred))

# Create the Support Vector Regression model
svr = SVR(kernel='rbf', gamma=1e-3, C=150, epsilon=0.3)
svr.fit(x_train, y_train.values.ravel())

y_svr_pred = svr.predict(x_test)

print('Score: %.3f' % svr.score(x_train, y_train))
print("Mean squared error: %.3f" % mean_squared_error(y_test, y_svr_pred))
print('Mean Absolute error: %.3f' % mean_absolute_error(y_test, y_svr_pred))
print('Variance score: %.3f' % r2_score(y_test, y_svr_pred))

# Create the k-Nearest Neighbors Regression Model
knn = neighbors.KNeighborsRegressor(n_neighbors = 7, weights = 'uniform')
knn.fit(x_train, y_train)

y_knn = knn.predict(x_test)

print('Score: %.3f' % knn.score(x_train, y_train))
print("Mean Squared Error: %.3f" % mean_squared_error(y_test, y_knn))
print('Mean Absolute error: %.3f' % mean_absolute_error(y_test, y_knn))
print('Variance Score: %.3f' % r2_score(y_test, y_knn))

# Predict Win Shares using Linear Regression Model
lin_new = stats_2018[['PS/G','TS%','TRB','VORP','PER','MP']]

lin_pred_2018 = linReg.predict(lin_new)

lin_names = stats_2018.iloc[:, 0]
a = []
for i, j in zip(lin_pred_2018, lin_names):
    a.append({'WS_pred':i,'Player':j})

lin_wins = pd.DataFrame(a)
lin_wins['WS_pred'] = round(lin_wins['WS_pred'].astype(float),2)

lin_wins = lin_wins.sort_values([('WS_pred')], ascending = False).reset_index(drop=True).head(10)
lin_wins = lin_wins.merge(ws_2018, on = 'Player', how = 'inner')


pos = np.arange(len(lin_wins['WS_pred']))

plt.style.use('fivethirtyeight')
fig, ax = plt.subplots(figsize = (15,8))
plt.bar(pos, lin_wins['WS_pred'], width = 0.4, alpha = 0.75, edgecolor = 'gray', linewidth = 3, label = 'Predicted')
plt.bar(pos + .4, lin_wins['WS'], width = 0.4, alpha = 0.75, edgecolor = 'gray', linewidth = 3, label = 'Actual',color = 'darkseagreen')
for i in pos:
    plt.text(pos[i], 0.5, s = lin_wins['Player'][i],ha='center', va='bottom', rotation = 'vertical',color = 'white', size = 25)
plt.text(x = -1.5, y = 18, s = '2018 NBA Predicted vs Actual Win Shares - Top 10 Players',fontsize = 30, weight = 'bold', alpha = .75)
plt.text(x = -1.5, y = 17, s = 'Wins shares are predicted with Linear Regression model',fontsize = 19, alpha = .85)
plt.text(x = -1.5, y = -1.5, s = 'National Basketball Association                                                                                       Source: Basketball-Reference.com ', fontsize = 17,color = '#f0f0f0', backgroundcolor = 'grey')
plt.xticks([],[])
plt.legend(prop={'size': 20})
plt.show()

# Predict Win Shares using Support Vector Regression Model
svr_new = stats_2018[['PS/G','TS%','TRB','VORP','PER','MP']]

svr_pred_2018 = svr.predict(svr_new)

svr_names = stats_2018.iloc[:, 0]

b = []
for i, j in zip(svr_pred_2018, svr_names):
    b.append({'WS_pred':i,'Player':j})


svr_wins = pd.DataFrame(b)
svr_wins['WS_pred'] = round(svr_wins['WS_pred'].astype(float),2)

svr_wins = svr_wins.sort_values([('WS_pred')], ascending = False).reset_index(drop=True).head(10)
svr_wins = svr_wins.merge(ws_2018, on = 'Player', how = 'inner')

pos = np.arange(len(svr_wins['WS_pred']))

plt.style.use('fivethirtyeight')
fig, ax = plt.subplots(figsize = (15,8))
plt.bar(pos, svr_wins['WS_pred'], width = 0.4, alpha = 0.75, edgecolor = 'gray', linewidth = 3, label = 'Predicted')
plt.bar(pos + 0.4, svr_wins['WS'], width = 0.4, alpha = 0.75, edgecolor = 'gray', linewidth = 3,label = 'Actual',color = 'darkseagreen')
for i in pos:
    plt.text(pos[i], 0.5, s = svr_wins['Player'][i],ha='center', va='bottom', rotation = 'vertical',color = 'white', size = 25)
plt.text(x = -1.5, y = 18, s = '2018 NBA Predicted vs Actual Win Shares - Top 10 Players',fontsize = 30, weight = 'bold', alpha = .75)
plt.text(x = -1.5, y = 17, s = 'Wins shares are predicted with Support Vector Regression model',fontsize = 19, alpha = .85)
plt.text(x = -1.5, y = -1.5, s = 'National Basketball Association                                                                                       Source: Basketball-Reference.com ', fontsize = 17,color = '#f0f0f0', backgroundcolor = 'grey')
plt.xticks([],[])
plt.legend(prop={'size': 20})
plt.show()

# Predict Win Shares using k-Nearest Neighbors Regression Model
knn_new = stats_2018[['PS/G','TS%','TRB','VORP','PER','MP']]

knn_pred_2018 = knn.predict(svr_new)

knn_names = stats_2018.iloc[:, 0]

c = []
for i, j in zip(knn_pred_2018, knn_names):
    c.append({'WS_pred':i,'Player':j})


knn_wins = pd.DataFrame(c)
knn_wins['WS_pred'] = round(knn_wins['WS_pred'].astype(float),2)

knn_wins = knn_wins.sort_values([('WS_pred')], ascending = False).reset_index(drop=True).head(10)
knn_wins = knn_wins.merge(ws_2018, on = 'Player', how = 'inner')


pos = np.arange(len(knn_wins['WS_pred']))

plt.style.use('fivethirtyeight')
fig, ax = plt.subplots(figsize = (15,8))
plt.bar(pos, knn_wins['WS_pred'], width = 0.4, alpha = 0.75, edgecolor = 'gray', linewidth = 3, label = 'Predicted')
plt.bar(pos + 0.4, knn_wins['WS'], width = 0.4, alpha = 0.75, edgecolor = 'gray', linewidth = 3,label = 'Actual',color = 'darkseagreen')
for i in pos:
    plt.text(pos[i], 0.5, s = knn_wins['Player'][i],ha='center', va='bottom', rotation = 'vertical',color = 'white', size = 25)
plt.text(x = -1.5, y = 18, s = '2018 NBA Predicted vs Actual Win Shares - Top 10 Players',fontsize = 30, weight = 'bold', alpha = .75)
plt.text(x = -1.5, y = 17, s = 'Wins shares are predicted with k-Nearest Neighbors Regression model',fontsize = 19, alpha = .85)
plt.text(x = -1.5, y = -1.5, s = 'National Basketball Association                                                                                       Source: Basketball-Reference.com ', fontsize = 17,color = '#f0f0f0', backgroundcolor = 'grey')
plt.xticks([],[])
plt.legend(prop={'size': 20})
plt.show()
