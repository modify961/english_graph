from flask import Flask, jsonify, request, Response
from py.neo4j.wordGraph import WordGraph
from py.neo4j.convertToGraph import ConvertToGraph
from py.llm.chatToDeepSeek import ChatToDeepSeek
from flask_cors import CORS  # 引入 CORS
import requests
import re


app = Flask(__name__)

CORS(app) 

@app.route("/graph", methods=["POST"])
def get_graph():
    word_graph = WordGraph()
    graph_data = word_graph.get_all_nodes_and_relationships()
    date=ConvertToGraph.convert_to_custom_format(graph_data)
    return jsonify(date)

@app.route('/chatToLLMBySteam', methods=['POST'])
def proxy():
    # 从 POST 请求中提取参数
    req_data = request.json
    if not req_data or 'type' not in req_data or 'message' not in req_data :
        return {"error": "Missing required parameters"}, 400
    
    # 获取请求参数
    message = req_data["message"]
    type = req_data["type"]
    chatModel={}
    if type=="deepseek":
        chat=ChatToDeepSeek()
        chatModel=chat.requestModel(message)
    else:
        chat=ChatToDeepSeek()
        chatModel=chat.requestModel(message)

    # 向 OpenAI API 发送请求，并以流式返回给客户端
    response = requests.post(chatModel.url, json=chatModel.chatModel, headers=chatModel.headers, stream=True)
    if response.status_code == 200:
        def generate():
            pattern = re.compile(r'id:\d+\nevent:result\n:HTTP_STATUS/200\ndata:', re.MULTILINE)
            for chunk in response.iter_content(chunk_size=102800):
                try:
                    chunk_str = chunk.decode('utf-8')  # 假设数据是文本类型，解码为字符串处理
                    processed_chunk = pattern.sub('', chunk_str)
                    # logging.info(chunk_str)
                    yield processed_chunk.encode('utf-8')
                except Exception as e:
                    # 这里可以根据需要进行错误处理，比如记录日志、发送简化的错误消息或忽略该错误等
                    print(f"An error occurred during data processing: {e}")
                
        # 设置合适的Content-Type，这里假设原始数据是文本类型
        return Response(generate(), content_type='text/plain; charset=utf-8')
    else:
        return "Error fetching data from LLM.", 500


if __name__ == '__main__':
    app.run(debug=True, port=8600)
