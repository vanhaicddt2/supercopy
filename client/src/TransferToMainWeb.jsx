import React, { useEffect, useState } from 'react';
import * as useApi from './api/user';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import './App.css';
import { informationToast } from './units/other/toast.js'
function TransferToMainWeb() {
  const { name } = useParams();
  const [data, setData] = useState({
    copy1: "",
    copy2: ""
  })

  const [msg, setMsg] = useState("test");
  const [file, setFile] = useState(null);
  const dateToNumber = Date.now();

  useEffect(() => {
      const takeData = async () => {
         const result = await useApi.getData(name,"token");

         if(result){
            setData({
              copy1: result.data.data.copy1,
              copy2: result.data.data.copy2
            })
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

  function updateToServer() {
    const updateServer = async () => {
      const result = await useApi.saveData(name, data, "token");
   }

   updateServer();
  }

  const handleFileChange = (e) => {
    // if (Number(branchID) === 15)
    // else setFile(e.target.files[0]);    
    handleImageChange(e)    
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");    
            const MAX_WIDTH = 1500; // Set maximum width for the resized image
            const scaleFactor = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleFactor;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //  const resizedDataURL = canvas.toDataURL("image/png");
            let resizedDataURL 
            canvas.toBlob((blob) => {
                resizedDataURL = new File([blob], "fileName.jpg", { type: "image/jpeg" })
                setFile(resizedDataURL);
            }, 'image/jpeg');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

const handleUploadPassport = async (link,name) => {
    console.log("start up Picture")
    const formData = new FormData();
    formData.append('image', file);
    //formData.append('image_data', file);
    // image_data

    try {
    console.log("start up Picture 2")
   const response = await fetch(`/upload${link}/${name}`, { //+dataState._id
   // const response = await fetch(`/user/update_picture/home/banner/banner2`, { //+dataState._id
        method: 'POST',
        body: formData,
        // headers: { Authorization: "", },
        // headers: { Link: link, Name: name },
    });

    // const response = await axios.post(`/user/update_picture/home/banner/banner2`, formData, {
    //     //http://localhost:3000/user/update_picture/product/image/test2
    //     ///user/update_picture/home/banner/banner2
    //     headers: {
    //         'Content-Type':'multipart/form-data'
    //     }
    // });
    console.log("response", response);

    //   if (response.ok) {
    //     const data = await response.json();
    //     //console.log('URL ảnh đã tải lên:', data.imageUrl);
        
    //     const responseUpPassport = await uploadPassPort(dataState._id, { link:data.imageUrl }, token);

    //     //console.log("responseUpPassport", responseUpPassport);

    //     if(responseUpPassport) {
    //         if(responseUpPassport.data.status === 1) informationToast(responseUpPassport.data.msg);
    //         else errorToast(responseUpPassport.data.msg);
    //     }
    //     // update to server
    //     setDataState({
    //         ...dataState,
    //         passport: data.imageUrl
    //     })
    //   } else {
    //     errorToast("Error when upload Passport, Please check the photo size < 1Mb")
    //     //console.error('Lỗi tải lên ảnh.');
    //   }
    } catch (error) {
    console.error('Lỗi kết nối máy chủ:', error);
    }
};

const LIST_UPDATE = {
  banner: [
      {
          "linkPicture": "vanhaicddt1.png?v="+dateToNumber,
          "linkUpdate": "/home/banner",
          "name": "banner1"
      },
      {
          "linkPicture": "vanhaicddt2.png?v="+dateToNumber,
          "linkUpdate": "/home/banner",
          "name": "banner2"
      },
      {
          "linkPicture": "vanhaicddt3.png?v="+dateToNumber,
          "linkUpdate": "/home/banner",
          "name": "banner3"
      },
  ],
}

  function renderListIUpPicture(listRender, list) {
      return listRender.map((item, index) => {
          return renderInputPicture(item.linkPicture, item.linkUpdate, item.name, index+list)
      })
  }

  function renderInputPicture(linkPicture, linkUpdate, name, index) {
      return (
      <div style={{background: (index === 0 || index === 2 || index === 4) ? "yellow":""}}>
          <div style={{width:'400px'}}>
              <img className="admin-home_page-picture-content-item" src={`/image/${linkPicture}`}></img>
              <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div>
              <span className="mr-3 ml-2 mt-1">Link goto: </span>
              <input type="text" className="admin-home_page-picture-content-input_link"/>
          </div>
          <button className="btn btn-primary mt-3" onClick={() => handleUploadPassport(linkUpdate, name)}>Update Picture</button>
      </div>
      )
  }

  return (
    <div className="App p-5" style={{ textAlign:'center', alignItems:'center', margin: 'auto'}}>
      {/* <h1 style={{width:'100%'}}>Copy Test by Hai</h1> */}
      {/* <div style={{color:''}}>MSG: {msg}</div> */}
      <div class="form-group" style={{ position:'relative'}}>
          <label for="exampleInputEmail1">Text Copy 1</label>
          <input value={data.copy1} type="text" name="copy1"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="copy 1"
                  onChange={e => changeContent(e.target.name, e.target.value)} />
          <CopyToClipboard text={data.copy1} onCopy={()=>informationToast("Success copy 1")}>
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
          <CopyToClipboard text={data.copy2} onCopy={()=>informationToast("Success copy 2")}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                style={{position:'absolute', top:'31px', right: '0'}}
                width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
            {/* <button>Sao chép</button> */}
          </CopyToClipboard>
      </div>

      <button className='btn btn-primary mt-3' onClick={()=>updateToServer()}>Change Content</button>


      <div className="admin-home_page-big_sale">
            <div className="admin-content-title">Transfer picture</div>
            <div className="admin-home_page-picture-content">
                    <div className="d-flex" style={{width:'100%'}}>
                         {renderListIUpPicture(LIST_UPDATE.banner.slice(0, 3), 0)}
                    </div>
                </div>

            </div>

    </div>
  );
}

export default TransferToMainWeb;