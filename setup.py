from flask import Flask, jsonify
from py.neo4j.Neo4j_Util import Neo4jUtil
from flask_cors import CORS  # 引入 CORS

app = Flask(__name__)

CORS(app) 

@app.route("/graph", methods=["GET"])
def get_graph():
    neo4j_util = Neo4jUtil()
    graph_data = neo4j_util.get_graph()
    return jsonify(graph_data)


if __name__ == '__main__':
    app.run(debug=True, port=8600)
