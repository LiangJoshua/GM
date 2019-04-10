# champs_runner_DA.py
import pandas as pd
import statsmodels.api as sm
from sklearn.linear_model import LinearRegression
from sklearn.feature_selection import RFE
from pandas.plotting import scatter_matrix
from pandas import set_option
from pandas import read_csv

champsFile = 'champs.csv'
runnersFile = 'runners.csv'

data1 = pd.read_csv(champsFile)
data2 = pd.read_csv(runnersFile)

#Exclude unimportant columns from the features (columns with non-numeric data, such
#as Team)
champsData = data1.drop(['Team', 'Year', 'Game'], axis=1)
runnersData = data2.drop(['Team', 'Year', 'Game'], axis=1)
champsData.dropna(inplace=True)
runnersData.dropna(inplace=True)



# save features as pandas dataframe for stepwise feature selection
champsX1 = champsData.drop(champsData.columns[0], axis = 1)
champsY1 = champsData.drop(champsData.columns[1:21], axis = 1)
runnersX1 = runnersData.drop(runnersData.columns[0], axis = 1)
runnersY1 = runnersData.drop(runnersData.columns[1:21], axis = 1)

# separate features and response into two different arrays
champsArray = champsData.values
champsX = champsArray[:,1:21]
champsY = champsArray[:,0]

runnersArray = runnersData.values
runnersX = runnersArray[:,1:21]
runnersY = runnersArray[:,0]
# stepwise forward-backward selection
# need to change the input types as X in this function needs to be a pandas
# dataframe

def stepwise_selection(X, y,
                       initial_list=[],
                       threshold_in=0.01,
                       threshold_out=0.05,
                       verbose=True):
    """ Perform a forward-backward feature selection
    based on p-value from statsmodels.api.OLS
    Arguments:
        X - pandas.DataFrame with candidate features
        y - list-like with the target
        initial_list - list of features to start with (column names of X)
        threshold_in - include a feature if its p-value < threshold_in
        threshold_out - exclude a feature if its p-value > threshold_out
        verbose - whether to print the sequence of inclusions and exclusions
    Returns: list of selected features
    Always set threshold_in < threshold_out to avoid infinite looping.
    See https://en.wikipedia.org/wiki/Stepwise_regression for the details
    """
    included = list(initial_list)
    while True:
        changed = False
        # forward step
        excluded = list(set(X.columns) - set(included))
        new_pval = pd.Series(index=excluded)
        for new_column in excluded:
            model = sm.OLS(y, sm.add_constant(pd.DataFrame(X[included + [new_column]]))).fit()
            new_pval[new_column] = model.pvalues[new_column]
        best_pval = new_pval.min()
        if best_pval < threshold_in:
            best_feature = new_pval.argmin()
            included.append(best_feature)
            changed = True
            if verbose:
                print('Add  {:30} with p-value {:.6}'.format(best_feature, best_pval))

        # backward step
        model = sm.OLS(y, sm.add_constant(pd.DataFrame(X[included]))).fit()
        # use all coefs except intercept
        pvalues = model.pvalues.iloc[1:]
        worst_pval = pvalues.max()  # null if pvalues is empty
        if worst_pval > threshold_out:
            changed = True
            worst_feature = pvalues.argmax()
            included.remove(worst_feature)
            if verbose:
                print('Drop {:30} with p-value {:.6}'.format(worst_feature, worst_pval))
        if not changed:
            break
    return included


champsResult = stepwise_selection(champsX1, champsY1)
runnersResult = stepwise_selection(runnersX1, runnersY1)

print('resulting champs features:')
print(champsResult)

print('resulting runner up features:')
print(runnersResult)

# Determiniation of dominant features , Method one Recursive Model Elimination,
# very similar idea to foreward selection but done recurssively. This method is gready
# which means it tries one feature at the time
NUM_FEATURES = 16
# this is kind of arbitrary but the idea should come by observing the scatter plots and correlation.
model = LinearRegression()
rfe = RFE(model, NUM_FEATURES)
champsFit = rfe.fit(champsX, champsY)
print("For Champions:")
print("Num Features:", champsFit.n_features_)
print("Selected Features:", champsFit.support_)
print("Feature Ranking:", champsFit.ranking_)

runnersFit = rfe.fit(runnersX, runnersY)
print("For Runner Ups:")
print("Num Features:", runnersFit.n_features_)
print("Selected Features:", runnersFit.support_)
print("Feature Ranking:", runnersFit.ranking_)
      
# calculate the score for the selected features
champsScore = rfe.score(champsX,champsY)
runnersScore = rfe.score(runnersX,runnersY)
print("Model Champs Score with selected features is: ", champsScore)
print("Model Runer up Score with selected features is: ", runnersScore)

"""
Results:

Run in terminal to see results. Not very good because these 2 datasets
are more of a classification model. Linear Regression is not very good here.

"""
