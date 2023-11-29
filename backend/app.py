from flask import Flask, request, jsonify
from flask_cors import CORS
from in_memory_db import InMemoryDB


app = Flask(__name__)
CORS(app, supports_credentials=True)



glBalDB = InMemoryDB()

glBalDB.load_csv_to_db('glbal.csv', 'glbal.json')

meta_data = glBalDB.load_json('glbal.json')

@app.route('/')
def home():
    return "Hello, this is the home endpoint!"

@app.route('/glbal/meta', methods=['GET'])
def glbal_meta():
    return jsonify(meta_data), 200

@app.route('/glbal', methods=['POST'])
def glbal():
    data = request.json
    startRow = int(data.get("startRow", 0))
    endRow = int(data.get("endRow", 100))
    limit = endRow - startRow
    offset = startRow

    # Initialize base query
    query = "SELECT * FROM omni_gl_balances"

    # Adding filtering
    filterModel = data.get("filterModel", {})
    filter_clauses = []
    for field, filter_data in filterModel.items():
        if filter_data['type'] == 'contains':
            filter_clauses.append(f"{field} LIKE '%{filter_data['filter']}%'")

    if filter_clauses:
        query += " WHERE " + " AND ".join(filter_clauses)

    # Adding sorting
    sortModel = data.get("sortModel", [])
    if sortModel:
        sort_clauses = [f"{sm['colId']} {sm['sort'].upper()}" for sm in sortModel]
        query += " ORDER BY " + ", ".join(sort_clauses)

    # Adding pagination
    query += f" LIMIT {limit} OFFSET {offset};"

    print(query)
    result = glBalDB.query(query)
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(debug=True, port=5001)
