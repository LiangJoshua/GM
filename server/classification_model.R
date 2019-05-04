# What does it take to be an NBA championship team? Classification Model?
library(tidyverse)
library(caret)
setwd('~/desktop/github/gm/server')

champs <- read_csv(file = "data/champs_2000.csv")
runners <- read_csv(file = "data/runners_2000.csv")
players <- read_csv(file="data/players.csv")
test <- read_csv(file = "data/test.csv")
test1 <- read_csv(file="data/champs_copy.csv")
# colnames(champs)
champs %>% 
  select(Team) %>%
  distinct()

#Fix naming problem with Warriorrs and 'Heat'. Turn Win and Home into factors. 
#Do the same with the runners data.
champs <- champs %>%
  mutate(Team = ifelse(Team == "Warriorrs","Warriors",Team)) %>%
  mutate(Team = ifelse(Team == "'Heat'","Heat",Team)) %>%
  mutate(Win = as.factor(Win)) %>%
  mutate(Home = as.factor(Home)) %>%
  mutate(X = as.numeric(X))

runners <- runners %>%
  mutate(Win = as.factor(Win)) %>%
  mutate(Home = as.factor(Home)) %>%
  rename(X = Y)

players <- players %>%
  mutate(TPP = as.factor(TPP)) %>%
  mutate(id = 1:(nrow(players)*1))

test %>%
  select(Team) %>%
  distinct()

test <- test %>%
  mutate(Win = as.factor(Win)) %>%
  mutate(Home = as.factor(Home)) %>%
  mutate(X = as.numeric(X))

test1 <- test1 %<%
  mutate(Win = as.factor(Win)) %>%
  mutate(Home = as.factor(Home)) %>%
  mutate(X = as.numeric(X))

players_train <- sample_frac(players, 0.5)
players_test <- anti_join(players,players_train,by = 'id')

#Combine champs and runners with a row bind, then split 75-25 
#into a training and test set respectively using an anti-join
fullPostSeasons <- bind_rows(champs,runners) %>%
  mutate(id = 1:(nrow(champs)*2))


fullPostSeasons_train <- sample_frac(fullPostSeasons,0.75)
fullPostSeasons_test <- anti_join(fullPostSeasons,fullPostSeasons_train,by = 'id')

#Check the team names once more to make sure no duplicates or misspellings.
champs %>%
  select(Team) %>%
  distinct()

#Does home court advantage really lead to more points scored?
PTS_HomeVsAway_test <- aov(data = fullPostSeasons, formula = PTS ~ Home)
summary(PTS_HomeVsAway_test)[[1]]

#The ANOVA test indicates that there is a significant difference in points 
#scored per game for when playing at home vs. playing away.

#Building a model to predict Wins and Losses for both champs and runners up. 
#Fist start with a full model that has all potentially meaningful variables, 
#and work backwards from there to minimize AIC.
WL <- glm(data = fullPostSeasons, 
          formula = Win ~ FGP + TPP + 
            TRB + STL + TOV + AST, 
          family = "binomial")

# Use backwards step-wise regression to build highly predictive model without overfitting
backWL <- step(WL, trace = 0)
summary(backWL)

#Interestingly, backwards step-wise logistic regression eliminated the home court variable 
#from the model to minimize AIC. So, even though the ANOVA test of PTS ~ Home indicated that 
#there is a significant difference in mean points scored per game for home court vs. away court, 
#when modeling actual wins, home court advantage was not as important.

#Now, lets make predictions from the test data set using the model built from the training data, 
#then calculate predictive performance using the confusionMatrix() function from the caret 
#package.
preds <- predict(backWL, test, type = "response") %>%
  round()

preds_table <- table(preds, test$Win)
confusionMatrix(preds_table)


#Logistic Regression Done... Similar to Binomial Regression

TPP <- glm(data = players_train, 
          formula = TPP ~ FGP + eFGP)

# Use backwards step-wise regression to build highly predictive model without overfitting
backTPP <- step(TPP, trace = 0)
summary(TPP)

preds1 <- predict(backTPP, players_test, type = "response") %>%
  round()

preds_table1 <- table(preds1, players_test$TPP)
confusionMatrix(preds_table1)

plot(WL)