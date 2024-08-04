from py2neo import Node, Relationship
from py.neo4j.neo4jUtil import Neo4jUtil

class WordGraph:
    def __init__(self):
        self.neo4j = Neo4jUtil()

    def create_root(self, root_name):
        root = Node("Root", name=root_name)
        self.neo4j.graph.create(root)
        return root
    
    def create_word(self, word_name, meaning, root):
        word = Node("Word", name=word_name, meaning=meaning)
        rel = Relationship(word, "HAS_ROOT", root)
        self.neo4j.graph.create(rel)
        return word
    
    def create_similarity(self, word1, word2):
        rel = Relationship(word1, "SIMILAR_TO", word2)
        self.neo4j.graph.create(rel)
    
    def create_note_for_node(self, node, note_content):
        note = Node("Note", content=note_content)
        rel = Relationship(node, "HAS_NOTE", note)
        self.neo4j.graph.create(rel)
    
    def get_all_nodes_and_relationships(self):
        return self.neo4j.get_all_nodes_and_relationships()
    
    
    # 创建例子
    def create_simple(self):
        # 创建词根
        bene = self.create_root("bene")
        mal = self.create_root("mal")
        
        # 创建单词并关联词根
        benevolent = self.create_word("benevolent", "慈善的", bene)
        benefactor = self.create_word("benefactor", "恩人", bene)
        malice = self.create_word("malice", "恶意", mal)
        malefactor = self.create_word("malefactor", "罪人", mal)
        
        # 创建相似关系
        self.create_similarity(benevolent, benefactor)
        self.create_similarity(malice, malefactor)
        
        # 添加笔记
        self.create_note_for_node(benevolent, "This word is often used to describe charitable organizations.")
        
        self.neo4j.close_driver()