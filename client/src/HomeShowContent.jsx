import React, { useEffect, useState } from 'react';
import * as useApi from './api/user.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { informationToast } from './units/other/toast.js'
import axios from "axios";
import { useSocket } from './context/SocketContext';

import './index.css';

const COPY_FIELDS = [
  { key: 'copy1', label: 'Copy 1' },
  { key: 'copy2', label: 'Copy 2' },
  { key: 'copy3', label: 'Copy 3' },
  { key: 'copy4', label: 'Copy 4' },
  { key: 'copy5', label: 'Copy 5' },
  { key: 'copy6', label: 'Copy 6' },
  { key: 'copy7', label: 'Copy 7' },
];

function HomeShowContent() {
  const { name } = useParams();
  const { socket, isConnected } = useSocket();
  const [data, setData] = useState({
    copy1: "",
    copy2: "",
    copy3: "",
    copy4: "",
    copy5: "",
    copy6: "",
    copy7: "",
    tabSelect: "text"
  })

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const dateToNumber = Date.now();

  useEffect(() => {
      const takeData = async () => {
         setIsLoading(true);
         const result = await useApi.getData(name,"token");

         if(result){
            setData({
              ...data,
              copy1: result.data.data.copy1,
              copy2: result.data.data.copy2,
              copy3: result.data.data.copy3 ? result.data.data.copy3 : "",
              copy4: result.data.data.copy4 ? result.data.data.copy4 : "",
              copy5: result.data.data.copy5 ? result.data.data.copy5 : "",
              copy6: result.data.data.copy6 ? result.data.data.copy6 : "",
              copy7: result.data.data.copy7 ? result.data.data.copy7 : "",

            //  tabSelect: result.data.data.tabSelect,
            })
            setImageUrl(result.data.data.picture1 ? result.data.data.picture1 :"/image/"+name+".png?v="+dateToNumber)
            informationToast("Successfully load data!!")
          } else {
         }
         setIsLoading(false);
        //  console.log("result", result);
      }

      takeData();
  },[])

  // Socket.io Real-time Listener
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on('content:updated', (payload) => {
      console.log('📡 Real-time Content Update:', payload);
      informationToast('✅ Content updated from server!');

      // Cập nhật data nếu đó là update cho page này
      if (payload.name === name && payload.data) {
        setData(prevData => ({
          ...prevData,
          copy1: payload.data.copy1 || prevData.copy1,
          copy2: payload.data.copy2 || prevData.copy2,
          copy3: payload.data.copy3 || prevData.copy3,
          copy4: payload.data.copy4 || prevData.copy4,
          copy5: payload.data.copy5 || prevData.copy5,
          copy6: payload.data.copy6 || prevData.copy6,
          copy7: payload.data.copy7 || prevData.copy7,
        }));
      }
    });

    return () => {
      socket.off('content:updated');
    };
  }, [socket, isConnected, name]);

  function changeContent(target, value) {
     const newData = { ... data }
     newData[target] = value;
     setData(newData);
  }

  function updateToServer(data) {
    const updateServer = async () => {
      setIsSaving(true);
      try {
        await useApi.saveData(name, data, "token");
      } finally {
        setIsSaving(false);
      }
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
      setIsUploading(true);
      const response = await axios.post("/upload/"+name, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateToServer({ picture1: response.data.imageUrl })
      setImageUrl(response.data.imageUrl + "?v=" + dateToNumber);

    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };


  function renderTextContent() {

    function renderOneCopyText(text, copy) {
        return (
          <div className="form-group" key={copy}>
            <label htmlFor={copy} className='text-label-copy'>{text}</label>
            <textarea
              value={data[copy]}
              name={copy}
              className="form-control"
              id={copy}
              aria-describedby="emailHelp"
              placeholder={text}
              onChange={e => changeContent(e.target.name, e.target.value)}
            ></textarea>
            <CopyToClipboard text={data[copy]} onCopy={() => informationToast("Success " + copy)}>
              <button type="button" className="copy-icon-btn" aria-label={"Copy " + text}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="icon-sm">
                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z"></path>
                </svg>
              </button>
            </CopyToClipboard>
          </div>
        )
    }
    return (
        <>
            <div className="copy-list">
              {COPY_FIELDS.map(f => renderOneCopyText(f.label, f.key))}
            </div>

            <div className="action-bar">
              <button className='btn btn-success' onClick={() => window.location.reload()}>Reload</button>
              <button className='btn btn-primary' onClick={() => updateToServer(data)} disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Change Content'}
              </button>
            </div>
        </>
    )
  }

  function renderPictureContent() {
    return (
      <div className="picture-panel">
        <div className="picture-preview-wrap">
          <img className='admin-home_page-picture-content-item' src={imageUrl} alt="Uploaded" width="200" />
        </div>
        <div className="picture-upload-row">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} className='btn btn-primary p-2' disabled={isUploading}>
            {isUploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App p-3 pt-0">
        <div className='infor'>
            <div>
              <div className="title-infor">Super Copy</div>
              <div className="sub-infor">* Copyright by Hai and domain money has been shared by TungLam</div>
            </div>
            <span
              className={'status-badge ' + (isConnected ? 'online' : 'offline')}
              title={isConnected ? 'Real-time connected' : 'Not connected'}
            >
              <span className="dot"></span>
              <span className="status-badge_text">{isConnected ? 'Real-time connected' : 'Not connected'}</span>
            </span>
        </div>

        <div className='select-tab' role="tablist">
            <div
              role="tab"
              tabIndex={0}
              aria-selected={data.tabSelect === "text"}
              className={'select-tab_item ' + (data.tabSelect === "text" ? "active" : "")}
              onClick={() => changeContent("tabSelect", "text")}
              onKeyDown={(e) => e.key === 'Enter' && changeContent("tabSelect", "text")}
            >TEXT</div>
            <div
              role="tab"
              tabIndex={0}
              aria-selected={data.tabSelect === "picture"}
              className={'select-tab_item ' + (data.tabSelect === "picture" ? "active" : "")}
              onClick={() => changeContent("tabSelect", "picture")}
              onKeyDown={(e) => e.key === 'Enter' && changeContent("tabSelect", "picture")}
            >PICTURE</div>
        </div>

        {isLoading ? (
          <div className="sub-infor" style={{ marginTop: '20px' }}>Loading…</div>
        ) : (
          <>
            {data.tabSelect === "text" && renderTextContent()}
            {(imageUrl && data.tabSelect === "picture") && renderPictureContent()}
          </>
        )}
    </div>
  );
}

export default HomeShowContent;
