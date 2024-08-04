const baseUrl="http://127.0.0.1:8600/"

async function fetchToBack(apiName,params){
    let getInfo={
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  }
    const response = await (0,fetch)(baseUrl+apiName,getInfo);
    const result = await response.json();
    return result?result:{};
  }
  export async  function loadAllWords(){
    //获取token
    let result=await fetchToBack("graph",{});
    return result;
  }