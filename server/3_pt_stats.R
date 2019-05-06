#Analysis on 3 points in NBA Finals
setwd('~/desktop/github/gm/server')
suppressMessages(library(tidyverse))
averages <- read.csv(file = 'data/champs_and_runner_ups_series_averages.csv')
eight_to_eightytwo  <- ggplot(data = filter(averages,Year < 1983),aes(x = Year, y = TP,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  scale_x_continuous(breaks=seq(1980, 1984, 1)) +
  ggtitle("NBA Finals, 1980-82") +
  ylab('Average Three Point Field Goals') 

eighty_to_seventeen  <- ggplot(data = averages,aes(x = Year, y = TP,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  scale_x_continuous(breaks=seq(1980, 2017, 1)) +
  ylab('Average Three Point Field Goals') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  ggtitle("NBA Finals, 1980-2017")

#plots average three point field goals from 1980-1982 and 1980-2017
eight_to_eightytwo 
eighty_to_seventeen

#plots points per game
points <- ggplot(data = averages, aes(x = Year, y = PTS, color = Status)) +
  geom_point(size = 1) +
  geom_smooth(method = 'loess',se=FALSE) + 
  ggtitle('Points Per Game') +
  theme(legend.position="none") +
  ylab('Points')

#plots 3 pointers per game
tp <- ggplot(data = averages, aes(x = Year, y = TP, color = Status)) +
  geom_point(size = 1) +
  geom_smooth(method = 'loess',se=FALSE) +
  ggtitle("3's Per Game") + 
  ylab("3's") +
  theme(legend.position="none")


percentage_of_points_threes <- averages %>% mutate(Percentage_of_Points_Threes = 3*TP/PTS*100)

#plots % of points from 3's
ppts_threes <- ggplot(data = percentage_of_points_threes, aes(x = Year, y = Percentage_of_Points_Threes, color = Status)) +
  geom_point(size = 1) +
  geom_smooth(method = 'loess',se=FALSE) +
  ggtitle("% of Points From 3's") +
  ylab('%') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  theme(legend.position="none")

#plots 3 point percentages
tpp <- ggplot(data = averages, aes(x = Year, y = TPP, color = Status)) +
  geom_point(size = 1) +
  geom_smooth(method = 'loess',se=FALSE) +
  theme(legend.position="none") +
  ggtitle('3PT %') +
  ylab('%')

#plots 3 point attempts per game
tpa <- ggplot(data = averages, aes(x = Year, y = TPA, color = Status)) +
  geom_point(size = 1) +
  geom_smooth(method = 'loess',se=FALSE) +
  theme(legend.position="bottom")+
  ggtitle('3 Attempts Per Game') +
  ylab('Attempts')

percentage_of_attempts_threes <- averages %>% mutate(perc_attempts = TPA/FGA*100)
perc_attempts_threes <- ggplot(data = percentage_of_attempts_threes, aes(x = Year, y = perc_attempts, color = Status)) +
  geom_point(size = 1) +
  geom_smooth(method = 'loess',se=FALSE) +
  ggtitle("% of FG Attempts, 3's") +
  ylab('%') +
  theme(legend.position="none")

suppressMessages(require(gridExtra))
grid.arrange(points,tp,ppts_threes,tpp,tpa,perc_attempts_threes,ncol=3)

by_decade <- read.csv(file = 'data/stats_by_decade.csv')
scoring_by_decade <- ggplot(data = by_decade,aes(x = Years, y = Average_PTS,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  ggtitle('Average Points Scored') + 
  ylab("Points") +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  theme(legend.position="none")
tp_by_decade <- ggplot(data = by_decade,aes(x = Years, y = Average_Made_Threes,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  ggtitle("3's Per Game") +
  theme(legend.position="none") +
  ylab("3's") 
tpa_by_decade <- ggplot(data = by_decade,aes(x = Years, y = Average_Attempted_Threes,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  ggtitle('3 Attempts Per Game') +
  theme(legend.position="none") +
  ylab("Attempts") 

tpp_by_decade <- ggplot(data = by_decade,aes(x = Years, y = Three_Point_Percentage,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  ggtitle('3PT %') +
  theme(legend.position="none") +
  ylab("%") 

per_points_tp_by_decade <- ggplot(data = by_decade,aes(x = Years, y = Percent_Points_Three,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  ggtitle("% of Points from 3's") +
  theme(legend.position="bottom") +
  ylab("%") 
per_attempts_by_decade <- ggplot(data = by_decade,aes(x = Years, y = Percentage_of_FGAs_TPs,fill = Status)) + 
  geom_bar(stat = 'identity',position = 'dodge') +
  theme(axis.text.x = element_text(angle=90,hjust = 1,vjust = 1)) +
  ggtitle("% of FG Attempts, 3's") +
  theme(legend.position="none") +
  ylab("%") 

#plot all the graphs
grid.arrange(scoring_by_decade,tp_by_decade,per_points_tp_by_decade,tpp_by_decade,tpa_by_decade,per_attempts_by_decade,ncol=3)
