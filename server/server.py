# server.py

# install Flask: pip3 install Flask
# To run server: python3 server.py
# Running on http://localhost:5000/
# To quit: Press CTRL+C to quit

from flask import Flask, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://faithchau:faith114@ds119702.mlab.com:19702/gm"
mongo = PyMongo(app)

@app.route("/")
def index():
    return "Hello World!"

@app.route("/testMongo")
def testdb():
    print("hello world")
    data = []
    atl = mongo.db.players.find({"Tm": "ATL"})

    for a in atl:
        a.pop('_id')
        data.append(a)

    return jsonify({"response": data})
    #for a in atl:
        #print(a)
    #return atl

if __name__ == "__main__":
    app.run()
