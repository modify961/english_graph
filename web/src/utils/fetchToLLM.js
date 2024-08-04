import UserPic from '../images/user.svg'
import { v4 as uuidv4 } from 'uuid';


function fetchWithLLM(self){
    let sedMessage=self.sendMessage;
    let type=self.type;
    // 定义 API URL，如果在本地开发，可能是 'http://localhost:5000/api'
    const apiUrl = 'http://127.0.0.1:8600/chatToLLMBySteam';
  
    // 创建请求的 JSON 数据
    const requestData = {
        type: type, // 根据你的 API 需求定义这个值
        message: sedMessage // 替换为需要发送到模型的具体消息
    };
  
    // 使用 fetch 发送 POST 请求
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
}
export async function chatWithLLM(sedMessage,type,appendMsg,updateMsg){
    appendMsg({
        type: 'text',
        content: { text: sedMessage },
        user: { avatar: UserPic },
        position: 'right',
    });
    let self ={
        type:type,
        sendMessage :sedMessage.trim(),
        controller: new AbortController()
      };
      let req=fetchWithLLM(self);
      req.then(response => {
        if (response.status === 200) {
            return response.body;
        } else {
            return Promise.reject(response);
        }
      }).then(async (readableStream) => {
        debugger
        const reader = readableStream.getReader();
        const encode = new TextDecoder("utf-8");
        const generateId = () => uuidv4();
        appendMsg({_id:generateId,type: 'llm',content: { text: "正在咨询，请稍后..." },user: { avatar: UserPic }});
        let contentJson=""
        reader.read().then(function processText({ done, value }) {
            let reciveInfo=encode.decode(value);
            let infos=reciveInfo.split("\n\n")
            if(infos.length>1){
                for(let i=0;i<infos.length;i++){
                    let jinfo=infos[i];
                    if("data: [DONE]"===jinfo){
                        continue;
                    }
                    debugger
                    jinfo=jinfo.replace("data: ","")
                    let data ={}
                    try{data=JSON.parse(jinfo)}catch(e){}
                    const textContent = data?.choices;
                    if(textContent&&textContent.length===1&&textContent[0].delta){
                        contentJson=contentJson+textContent[0].delta.content
                        updateMsg(generateId,{type: 'llm',content: { text: contentJson},user: { avatar: UserPic }});
                    }
                }
               
            }
            //返回结束
            if (done) {
              self.controller.abort();
              self.controller = new AbortController();
              return;
            }
            return reader.read().then(processText);
        });
      }).catch(error => {
          self.controller.abort('onerror')
          self.controller = new AbortController()
      });
}