# What does it take to be an NBA championship team? Classification Model?
library(tidyverse)
library(caret)


champs <- read_csv(file = "data/champs_2010.csv")
runners <- read_csv(file = "data/runners_2010.csv")

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

#Plotting points of champion teams in each game since 1980.
ggplot(data = champs, 
       aes(x = Year, y = PTS, color = Team, shape = Win)) + 
  geom_point(size = 1) +
  scale_x_continuous(breaks = 1980:2017) +
  theme_dark() +
  scale_color_brewer(palette = "Paired") + 
  theme(axis.text.x = element_text(size = 3, angle = 45),
        axis.text.y = element_text(size = 6, angle = 45)) +
  facet_wrap(~ Home, labeller = "label_both") + 
  ylab("Points Scored")

#Plotting field goal percentage of champion team in each game since 1980.
ggplot(data = champs, 
       aes(x = Year, y = FGP, color = Team, shape = Win)) + 
  geom_hline(yintercept = 0.50, size = 0.25, color = "gray95") + 
  geom_point(size = 1) +
  scale_x_continuous(breaks = 1980:2017) +
  scale_y_continuous(breaks = seq(0,1,by = 0.05), limits = c(0,1)) + 
  theme_dark() +
  scale_color_brewer(palette = "Paired") +
  theme(axis.text.x = element_text(size = 3, angle = 45),
        axis.text.y = element_text(size = 6, angle = 45)) +
  facet_wrap(~ Home, labeller = "label_both") + 
  ylab("Field Goal Percentage")

#Plotting three point percentage of champion team in each game since 1980.
ggplot(data = champs, 
       aes(x = Year, y = TPP, color = Team, shape = Win)) + 
  geom_point(size = 1) +
  scale_x_continuous(breaks = 1980:2017) +
  scale_y_continuous(breaks = seq(0,1,by = 0.05), limits = c(0,1)) + 
  theme_dark() +
  scale_color_brewer(palette = "Paired") +
  theme(axis.text.x = element_text(size = 3, angle = 45),
        axis.text.y = element_text(size = 6, angle = 45)) + 
  facet_wrap(~ Home, labeller = "label_both") + 
  ylab("Three Point Percentage")

#Plotting free throw percentage of champion team in each game since 1980.
ggplot(data = champs, 
       aes(x = Year, y = FTP, color = Team, shape = Win)) + 
  geom_point(size = 1) +
  scale_x_continuous(breaks = 1980:2017) +
  scale_y_continuous(breaks = seq(0,1,by = 0.05), limits = c(0,1)) + 
  theme_dark() +
  scale_color_brewer(palette = "Paired") +
  theme(axis.text.x = element_text(size = 3, angle = 45),
        axis.text.y = element_text(size = 6, angle = 45)) +
  facet_wrap(~ Home, labeller = "label_both") + 
  ylab("Free Throw Percentage")

ggplot(data = fullPostSeasons, 
       aes(x = Home, y = PTS, fill = Win)) + 
  geom_violin() + 
  theme_dark() +
  scale_fill_brewer(palette = "Paired") + 
  ylab("Points Scored")

#Does home court advantage really lead to more points scored?
PTS_HomeVsAway_test <- aov(data = fullPostSeasons, formula = PTS ~ Home)
kable(summary(PTS_HomeVsAway_test)[[1]])

#The ANOVA test indicates that there is a significant difference in points 
#scored per game for when playing at home vs. playing away.

#Building a model to predict Wins and Losses for both champs and runners up. 
#Fist start with a full model that has all potentially meaningful variables, 
#and work backwards from there to minimize AIC.
WL <- glm(data = fullPostSeasons_train, 
          formula = Win ~ Home + PTS + FGP + TPP + 
            FTP + TRB + STL + BLK + TOV + PF, 
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
preds <- predict(backWL, fullPostSeasons_test, type = "response") %>%
  round()

preds_table <- table(preds, fullPostSeasons_test$Win)
confusionMatrix(preds_table)




