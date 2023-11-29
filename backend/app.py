from flask import Flask, request, jsonify
from flask_cors import CORS
from in_memory_db import InMemoryDB


app = Flask(__name__)
CORS(app, supports_credentials=True)



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
    result = glBalDB.query('select * from omni_gl_balances')
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(debug=True, port=5001)
