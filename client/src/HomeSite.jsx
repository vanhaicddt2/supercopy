import React, { useEffect, useState } from 'react';
import * as useApi from './api/user.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { informationToast } from './units/other/toast.js'
import axios from "axios";

import './index.css';

function HomeSite() {
  const { name } = useParams();
  const [data, setData] = useState({
    copy1: "",
    copy2: "",
    copy3: "",
    copy4: "",
    copy5: "",
    tabSelect: "text"
  })

  const [msg, setMsg] = useState("picture");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const dateToNumber = Date.now();

  useEffect(() => {
      const takeData = async () => {
         const result = await useApi.getData(name,"token");

         if(result){
            setData({
              ...data,
              copy1: result.data.data.copy1,
              copy2: result.data.data.copy2,
              copy3: result.data.data.copy3 ? result.data.data.copy3 : "",
              copy4: result.data.data.copy4 ? result.data.data.copy4 : "",
              copy5: result.data.data.copy5 ? result.data.data.copy5 : "",
            //  tabSelect: result.data.data.tabSelect,
            })
            setImageUrl(result.data.data.picture1 ? result.data.data.picture1 :"/image/"+name+".png?v="+dateToNumber)
            informationToast("Successfully load data!!")
          } else {
         }
        //  console.log("result", result);
      }

      takeData();
  },[])

  function changeContent(target, value) {
     const newData = { ... data }
     newData[target] = value;
     setData(newData);
  }

  function updateToServer(data) {
    const updateServer = async () => {
      const result = await useApi.saveData(name, data, "token");
   }

   updateServer();
  }

const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload/"+name, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateToServer({ picture1: response.data.imageUrl })
      setImageUrl(response.data.imageUrl + "?v=" + dateToNumber);
      
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };


  function renderTextContent() {

    function renderOneCopyText(text, copy) {
        return (<div class="form-group d-flex" style={{ position:'relative'}}>
                    <label for={copy} className='text-label-copy'>{text}</label>
                    <textarea value={data[copy]} type="text" name={copy}  className="form-control" id={copy} aria-describedby="emailHelp" placeholder={copy}
                            onChange={e => changeContent(e.target.name, e.target.value)} ></textarea>
                    <CopyToClipboard text={data[copy]} onCopy={()=>informationToast("Success "+ copy)}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            style={{position:'absolute', top:'8px', right: '0'}}
                            width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
                        {/* <button>Sao chép</button> */}
                    </CopyToClipboard>
                </div>)
    }
    return (
        <>
            {renderOneCopyText("Text 1", "copy1")}
            {renderOneCopyText("Text 2", "copy2")}
            {renderOneCopyText("Text 3", "copy3")}
            {renderOneCopyText("Text 4", "copy4")}
            {renderOneCopyText("Text 5", "copy5")}

            <button className='btn btn-success mt-3' onClick={()=> window.location.reload() }>Reload</button>
           <button className='btn btn-primary mt-3 ml-3' onClick={()=>updateToServer(data)}>Change Content</button>
        </>
    )
  }

  return (
    <div className="App p-3 pt-0" style={{ textAlign:'center', alignItems:'center', margin: 'auto', marginTop: "0"}}>
        <div className='infor mb-1 mt-1'>
            <div className="title-infor" style={{width:'100%'}}>Super Copy</div>
            <div className="sub-infor">* Copyright by Hai and domain money has been shared by TungLam</div>
        </div>

        <div className='select-tab mb-3'>
            <div className={'select-tab_item ' + (data.tabSelect ==="text" ? "active": "")}
            onClick={() => changeContent("tabSelect", "text")}>TEXT</div>
            <div className={'select-tab_item ' + (data.tabSelect ==="picture" ? "active": "")}
            onClick={() => changeContent("tabSelect", "picture")}>PICTURE</div>
        </div>

        {
            data.tabSelect === "text"? renderTextContent() : "" //renderPictureContent()
        }

        {(imageUrl && data.tabSelect === "picture") && (
            <div>
                <img className='admin-home_page-picture-content-item' src={imageUrl} alt="Uploaded" width="200" />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} className='btn btn-primary p-2'>Upload</button>
            </div>
        )}


    </div>
  );
}

export default HomeSite;