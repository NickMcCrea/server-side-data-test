from flask import Flask, request
from flask_cors import CORS
from in_memory_db import InMemoryDB


app = Flask(__name__)
CORS(app)



glBalDB = InMemoryDB()
glBalDB.load_csv_to_db('glbal.csv', 'glbal.json')



@app.route('/')
def home():
    return "Hello, this is the home endpoint!"

@app.route('/glbal', methods=['POST'])
def glbal():
    #query = request.json.get("query", "")
    #print the request in JSON
    print(request.json)
    return glBalDB.query('select * from glbal')


if __name__ == '__main__':
    app.run(debug=True)
