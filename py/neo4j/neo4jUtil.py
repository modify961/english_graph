import configparser
from py2neo import Graph

class Neo4jUtil:
    def __init__(self, config_file='./py/config.ini'):
        self.config = self.load_config(config_file)
        self.graph = Graph(self.config['uri'], auth=(self.config['user'], self.config['password']))


    def load_config(self, config_file):
        config = configparser.ConfigParser()
        config.read(config_file)
        return {
            'uri': config.get('neo4j', 'uri'),
            'user': config.get('neo4j', 'user'),
            'password': config.get('neo4j', 'password')
        }
    
    # 关闭链接
    def close_driver(self):
        self.graph = None

    # 返回查询
    def run_query(self, query, parameters=None):
        return self.graph.run(query, parameters)
    
    # 全部删除数据
    def delete_all(self):
        self.graph.run("MATCH (n) DETACH DELETE n")
    
    # 获取所有的节点和链接关系
    def get_all_nodes_and_relationships(self):
        query = """
        MATCH (n)-[r]->(m)
        WHERE n.name <> 'note'
        RETURN id(n) AS from_id, n.name AS from_name,n.type AS from_type, id(m) AS to_id, m.name AS to_name, type(r) AS relationship
        UNION
        MATCH (n)
        WHERE NOT (n)-[]->() AND n.name <> 'note'
        RETURN id(n) AS from_id, n.name AS from_name,n.type AS from_type, null AS to_id, null AS to_name, null AS relationship
        """
        return self.graph.run(query).data()
    
    # 获取全部数据      
    def get_graph(self, query, parameters=None):
        return self.graph.run(query, parameters)


