import configparser
from neo4j import GraphDatabase

class Neo4jUtil:
    def __init__(self, config_file='./py/config.ini'):
        self.config = self.load_config(config_file)
        self.driver = GraphDatabase.driver(
            self.config['uri'], 
            auth=(self.config['user'], self.config['password'])
        )

    def load_config(self, config_file):
        config = configparser.ConfigParser()
        config.read(config_file)
        return {
            'uri': config.get('neo4j', 'uri'),
            'user': config.get('neo4j', 'user'),
            'password': config.get('neo4j', 'password')
        }

    def close_driver(self):
        self.driver.close()

    # 创建节点
    def create_node(self, label, properties):
        with self.driver.session() as session:
            query = f"CREATE (n:{label} {{"
            query += ", ".join([f"{k}: '{v}'" for k, v in properties.items()])
            query += "})"
            session.run(query)

    # 创建关系
    def create_relationship(self, label1, properties1, relationship, label2, properties2):
        with self.driver.session() as session:
            query = f"MATCH (a:{label1} {{"
            query += ", ".join([f"{k}: '{v}'" for k, v in properties1.items()])
            query += f"}}), (b:{label2} {{"
            query += ", ".join([f"{k}: '{v}'" for k, v in properties2.items()])
            query += f"}}) CREATE (a)-[:{relationship}]->(b)"
            session.run(query)
            
    # 获取全部数据      
    def get_graph(self):
        with self.driver.session() as session:
            result = session.run("""
            MATCH (n)
            OPTIONAL MATCH (n)-[r]->(m)
            RETURN n, r, m
            """)
            nodes = []
            edges = []
            for record in result:
                n = record["n"]
                r = record["r"]
                m = record["m"]
                nodes.append({"id": n.id, "label": list(n.labels)[0], "properties": dict(n.items())})
                if r:
                    edges.append({"source": n.id, "target": m.id, "label": r.type})
            return {"nodes": nodes, "edges": edges}


