import json


class ChatToDeepSeek:
    def __init__(self,model='deepseek-coder'):
        self.model=model
        self.url = "https://api.deepseek.com/chat/completions"
        self.headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer sk-5cd1bd108a0246bcb299670e4e7cde1c'
        }

    def requestModel(self,context):
        self.chatModel={
            "messages": [
                {
                "content": "You are a helpful assistant",
                "role": "system"
                },
                {
                "content": context,
                "role": "user"
                }
            ],
            "model": self.model,
            "frequency_penalty": 0,
            "max_tokens": 4096,
            "presence_penalty": 0,
            "response_format": {
                "type": "text"
            },
            "stop": None,
            "stream": True,
            "temperature": 1,
            "top_p": 1,
            "tools": None,
            "tool_choice": "none"
        }
        return self