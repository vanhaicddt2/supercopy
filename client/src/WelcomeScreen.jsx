import React from "react";
import { useState } from "react";
import './index.css';
import hai_hello_sticker from './units/img/hai_hello_sticker2.gif'
import lam_hello_sticker from './units/img/lam_hello_sticker2.gif'

export default function WelcomeScreen() {
  const [inputValue, setInputValue] = useState("");

  const handleOpenTab = () => {
    if (inputValue.trim()) {
      window.open(`/${encodeURIComponent(inputValue)}`, "_blank");
    }
  };

  return (
    <div className="welcome-site">
      <h1 className="welcome-site_title">Welcome Super Copy</h1>
      <div style={{fontSize:'0.8rem'}}>* Copyright by Hai and domain money has been shared by TungLam</div>
      <div className="mt-4">
        <div style={{ display:'flex' ,flexDirection: 'column-reverse' }}>
          <img src={lam_hello_sticker} alt="lam_hello_sticker" className="welcome-site_img" style={{width:"100%"}}/>
          <div className="chat-box">
              <p className="chat-text">Hello anh</p>
          </div>
        </div>
        <div style={{marginLeft:"200px", display:'flex' ,flexDirection: 'column-reverse'}}>
          <img src={hai_hello_sticker} alt="shark_hello" className="welcome-site_img" />
          <div className="chat-box">
            <p className="chat-text">Chào Lâm</p>
          </div>
        </div>
       
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value"
        className="welcome-site_input"
      />

      <button
        onClick={handleOpenTab}
        className="btn btn-primary welcome-site_button"
      >
        Open Tab
      </button>
    </div>
  );
}
