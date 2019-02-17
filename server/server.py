# server.py

# install Flask: pip3 install Flask
# To run server: python3 server.py
# Running on http://localhost:5000/
# To quit: Press CTRL+C to quit

from flask import Flask
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
