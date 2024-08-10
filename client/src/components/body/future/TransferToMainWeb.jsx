import React, { useEffect, useState } from 'react';
import * as useApi from '../../../api/user';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import './App.css';

function TransferToMainWeb() {
  const [data, setData] = useState({
    copy1: "",
    copy2: ""
  })

  const [msg, setMsg] = useState("test");

  useEffect(() => {
      const takeData = async () => {
         const result = await useApi.getData("vanhaicddt2","token");

         if(result){
            setData({
              copy1: result.data.data.copy1,
              copy2: result.data.data.copy2
            })
          } else {
         }
         console.log("result", result);
      }

      takeData();
  },[])


  function changeContent(target, value) {
     const newData = { ... data }
     newData[target] = value;
     setData(newData);
  }

  function updateToServer() {
    const updateServer = async () => {
      const result = await useApi.saveData("vanhaicddt2", data, "token");
   }

   updateServer();
  }

  return (
    <div className="App p-5" style={{ textAlign:'center', alignItems:'center', margin: 'auto'}}>
      <h1 style={{width:'100%'}}>Copy Test by Hai</h1>
      <div style={{color:''}}>MSG: {msg}</div>
      <div class="form-group" style={{ position:'relative'}}>
          <label for="exampleInputEmail1">Text Copy 1</label>
          <input value={data.copy1} type="text" name="copy1"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="copy 1"
                  onChange={e => changeContent(e.target.name, e.target.value)} />
          <CopyToClipboard text={data.copy1} onCopy={()=>setMsg("Success copy 1")}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                style={{position:'absolute', top:'31px', right: '0'}}
                width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
            {/* <button>Sao chép</button> */}
          </CopyToClipboard>
      </div>

      <div class="form-group" style={{ position:'relative'}}>
          <label for="exampleInputEmail1">Text Copy 2</label>
          <input value={data.copy2} type="text" name="copy2"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="copy 2"
                  onChange={e => changeContent(e.target.name, e.target.value)} />
          <CopyToClipboard text={data.copy2} onCopy={()=>setMsg("Success copy 2")}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                style={{position:'absolute', top:'31px', right: '0'}}
                width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
            {/* <button>Sao chép</button> */}
          </CopyToClipboard>
      </div>

      <button className='btn btn-primary mt-3' onClick={()=>updateToServer()}>Change Content</button>
    </div>
  );
}

export default TransferToMainWeb;