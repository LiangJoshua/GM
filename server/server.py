# server.py

# install Flask: pip3 install Flask
# To run server: python3 server.py
# Running on http://localhost:5000/
# To quit: Press CTRL+C to quit

import math

from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from flask import request
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://faithchau:faith114@ds119702.mlab.com:19702/gm"
mongo = PyMongo(app)
socketio = SocketIO(app)

@app.route("/")
def index():
    return "Hello World!"

@app.route("/get_team", methods=["GET"])
def get_team():
    data = mongo.db.user_draftedTeams.find({'name':request.args.get('user')})
    players = []
    for d in data:
        players= d['team']

    return jsonify(players)



@app.route("/store_team", methods=["POST"])
def store_team():
    #print (request.json)

    data = request.get_json(force=True)
    print (data['user'])
    print (data['team'])

    try:
        mongo.db.user_draftedTeams.insert_one(
        {
            "name": data['user'],
            "team": data['team']
        })
    except:
        return jsonify(success=False)

    return jsonify(winning_probability(data['team']))

def find_player_stats(playerName):
    searchPhrase = "\""+playerName+"\""
    playerInfo = mongo.db.players.find_one({'$text': {'$search': searchPhrase} })

    playerStats = {"FGP": 0 if isinstance (playerInfo["FG%"], str) else playerInfo["FG%"],
    "TPP":0 if isinstance (playerInfo["3P%"], str) else playerInfo["3P%"],
    "TRB":0 if isinstance (playerInfo["TRB"], str) else playerInfo["TRB"],
    "STL": 0 if isinstance (playerInfo["STL"], str) else playerInfo["STL"],
    "TOV": 0 if isinstance (playerInfo["TOV"], str) else playerInfo["TOV"],
    "AST": 0 if isinstance (playerInfo["AST"], str) else playerInfo["AST"]}

    print(playerInfo)

    return playerStats

def calculate_averages(listOfPlayers):
    averages = {"FGP": 0,
    "TPP": 0,
    "TRB": 0,
    "STL": 0,
    "TOV": 0,
    "AST": 0 }

    for p in listOfPlayers:
        p_stats = find_player_stats(p)
        averages["FGP"] = averages["FGP"] + p_stats["FGP"]
        averages["TPP"] = averages["TPP"] + p_stats["TPP"]
        averages["TRB"] = averages["TRB"] + p_stats["TRB"]
        averages["STL"] = averages["STL"] + p_stats["STL"]
        averages["TOV"] = averages["TOV"] + p_stats["TOV"]
        averages["AST"] = averages["AST"] + p_stats["AST"]

    averages["FGP"] = averages["FGP"] /12
    averages["TPP"] = averages["TPP"]/12


    print (averages)

    return averages

def winning_probability(listOfPlayers):
    averages = calculate_averages(listOfPlayers)


    INTERCEPT = -29.91258
    FGP = 39.26539
    TPP = 8.21720
    TRB = 0.32225
    STL = 0.24128
    TOV = -0.22237
    AST = -0.14096

    linear_predictor = INTERCEPT+ FGP*averages["FGP"] + TPP*averages["TPP"] + TRB*averages["TRB"] + STL*averages["STL"]+TOV*averages["TOV"]+AST*averages["AST"]

    winning_prob =(math.exp(linear_predictor))/(1+(math.exp(linear_predictor)))
    print(winning_prob)

    return winning_prob*100

@socketio.on('CONNECT')
def connect(json_data):
    print(json_data)
    emit('RECEIVE_CONNECTION', json_data,broadcast=True)

@socketio.on('SEND_MESSAGE')
def send_message(json_data):
    print(json_data)
    emit('RECEIVE_MESSAGE', json_data, broadcast=True)

@socketio.on('SEND_SCORE')
def send_score(json_data):
    emit('RECEIVE_MESSAGE', json_data, broadcast=True)
    score = {}
    score["action"] = "hi this is working"
    emit('RECEIVE_MESSAGE', score, broadcast=True)
    emit('RECEIVE_SCORE', json_data['opponent'], broadcast=True)

if __name__ == "__main__":
    socketio.run(app)
