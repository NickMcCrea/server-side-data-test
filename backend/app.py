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

    #get the 'startRow' from the request
    startRow = request.json.get("startRow", "")
 
    #get the 'endRow' from the request
    endRow = request.json.get("endRow", "")
   
    #limit is the start row + end row
    #offset is the start row

    #parse startRow and endRow to integers
    startRow = int(startRow)
    endRow = int(endRow)

    limit = endRow - startRow
    offset = startRow

    

    query = 'select * from omni_gl_balances limit ' + str(limit) + ' offset ' + str(offset) + ';'
    print(query)

    result = glBalDB.query(query)
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(debug=True, port=5001)
