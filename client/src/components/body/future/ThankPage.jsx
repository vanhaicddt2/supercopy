import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { COMPLETE } from '../../../components/body/survey/question.js';

import imgThankYou from '../../../units/img/thankyouGirl.gif'

function ThankPage() {
    const { language, idBranch } = useParams();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
      if (seconds > 0 && idBranch) {
        const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [seconds]);

    return (<div style={{ textAlign:'center' , padding: '65px' }}>  
        <div>-----------</div>
        <div style={{fontSize:'1.2rem', fontWeight:"600"}}>{COMPLETE[language === "jap" ? "jap" : "eng"]}</div>
        <img src={imgThankYou} 
             alt="thankyou"
             onClick={idBranch ? ()=>window.open("/","_self") : ""}
        />
        <div>-----------</div>
        {
          idBranch && <div>
          {seconds === 0 ? window.open("/","_self")
          : (
            <div style={{fontSize:'1.2rem', fontWeight:"600"}}>{seconds + (language === "jap" ? "秒でホームペーリに戻ります。" :" seconds go to home")}</div>
          )}
        </div> 
        }
    </div>)
}

export default ThankPage;
