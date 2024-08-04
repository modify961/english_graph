from flask import Flask, jsonify
from py.neo4j.wordGraph import WordGraph
from py.neo4j.convertToGraph import ConvertToGraph
from flask_cors import CORS  # 引入 CORS

app = Flask(__name__)

CORS(app) 

@app.route("/graph", methods=["POST"])
def get_graph():
    word_graph = WordGraph()
    graph_data = word_graph.get_all_nodes_and_relationships()
    date=ConvertToGraph.convert_to_custom_format(graph_data)
    return jsonify(date)


if __name__ == '__main__':
    app.run(debug=True, port=8600)
