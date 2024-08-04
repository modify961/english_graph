
class ConvertToGraph:
    @staticmethod
    def convert_to_custom_format(data):
        nodes = {}
        lines = []
    
        for record in data:
            from_id = str(record['from_id'])
            from_name = record['from_name']
            to_id = record['to_id']
            relationship = record['relationship']
            
            if from_id not in nodes:
                nodes[from_id] = {"id": from_id, "text": from_name, "myicon": "el-icon-star-on"}
            
            if to_id:
                to_id = str(to_id)
                to_name = record['to_name']
                if to_id not in nodes:
                    nodes[to_id] = {"id": to_id, "text": to_name, "myicon": "el-icon-setting"}
                lines.append({"from": from_id, "to": to_id, "text": relationship})
        
        result = {
            "rootId": next(iter(nodes)) if nodes else '',
            "nodes": list(nodes.values()),
            "lines": lines
        }
        return result