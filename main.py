# from py.neo4j.Neo4j_Util import Neo4jUtil

# def main():
#     # 创建 Neo4jUtil 实例
#     neo4j_util = Neo4jUtil()

#     # 创建词根节点
#     roots = [
#         {"root": "struct", "meaning": "build"},
#         {"root": "port", "meaning": "carry"},
#         {"root": "dict", "meaning": "say"},
#         {"root": "spect", "meaning": "see"},
#     ]

#     for root in roots:
#         neo4j_util.create_node("WordRoot", root)

#     # 创建单词和连接
#     words = {
#         "struct": ["construct", "destruction", "structure"],
#         "port": ["transport", "import", "export"],
#         "dict": ["dictionary", "predict", "contradict"],
#         "spect": ["inspect", "respect", "spectator"],
#     }

#     for root, words_list in words.items():
#         for word in words_list:
#             neo4j_util.create_node("Word", {"word": word, "definition": "Sample definition"})
#             neo4j_util.create_relationship("WordRoot", {"root": root}, "HAS_ROOT", "Word", {"word": word})

#     neo4j_util.close()

# if __name__ == "__main__":
#     main()
