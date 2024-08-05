from py2neo import Node, Relationship
from py.neo4j.neo4jUtil import Neo4jUtil

class WordGraph:
    def __init__(self):
        self.neo4j = Neo4jUtil()

    def create_type(self, type_name,type_meaning,metaData):
        root = Node("Type", name=type_name,meaning=type_meaning)
        rel = Relationship(root, "TYPE_TO", metaData)
        self.neo4j.graph.create(rel)
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
        note = Node("Note",name='note',content=note_content)
        rel = Relationship(note, "HAS_NOTE", node)
        self.neo4j.graph.create(rel)
    
    def get_all_nodes_and_relationships(self):
        return self.neo4j.get_all_nodes_and_relationships()
    
    def delete_all(self):
        return self.neo4j.delete_all()
    
    # 创建词根的元组分类
    def creat_meta(self):
        # 创建跟节点
        metaData = Node("MetaData", name="词根",type="mate")
        self.neo4j.graph.create(metaData)
        noun=self.create_type("Noun","名词词根",metaData)
        self.create_note_for_node(noun, "通常表示人、地点、事物或抽象概念")
        verb=self.create_type("Verb","动词词根",metaData)
        self.create_note_for_node(verb, "通常表示动作、过程或状态的变化")
        adjective=self.create_type("Adjective","形容词词根",metaData)
        self.create_note_for_node(adjective, "通常表示性质、状态或特征")
        adverb=self.create_type("Adverb","副词词根",metaData)
        self.create_note_for_node(adverb, "通常表示方式、程度或位置")
        preposition=self.create_type("Preposition","介词词根",metaData)
        self.create_note_for_node(preposition, "通常表示位置、方向或关系")

        self.neo4j.close_driver()


    # 创建例子
    def create_simple(self):
        # # 创建词根
        # bene = self.create_root("bene",metaData)
        # mal = self.create_root("mal",metaData)
        
        # # 创建单词并关联词根
        # benevolent = self.create_word("benevolent", "慈善的", bene)
        # benefactor = self.create_word("benefactor", "恩人", bene)
        # malice = self.create_word("malice", "恶意", mal)
        # malefactor = self.create_word("malefactor", "罪人", mal)
        
        # # 创建相似关系
        # self.create_similarity(benevolent, benefactor)
        # self.create_similarity(malice, malefactor)
        
        # # 添加笔记
        # self.create_note_for_node(benevolent, "This word is often used to describe charitable organizations.")
        
        self.neo4j.close_driver()