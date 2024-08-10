import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

import QRCode from "react-qr-code";
import logoAz from '../../../units/img/logo_az.png';
import scanQR from '../../../units/img/scan_qr3.png';
import touchTablet from '../../../units/img/touch_tablet.png';

import * as surveyAPI from '../../../api/survey';
import { surveyAction } from '../../../redux/actions';
// import { coverIDToFullName } from '../../../units/support/branch';
import './home.css';

function Home() {
    const dispatch = useDispatch();
    let history = useHistory();
    const { idBranch } = useParams();
    const surveyData = useSelector(state => state.survey);
    const [makeTokenSurveyScan, setMakeTokenSurveyScan] = useState("")

    useEffect(()=> {

        if(idBranch) {
            const deCode = async () => {
                const result = await surveyAPI.deCodeTokenRoom(idBranch, "token");

                if(result) {
                    if(result.data.data) {
                        localStorage.setItem('tokenHome', idBranch);
                        if(result.data.data.room === "home") {
                             const resultMakeToken = await surveyAPI.makeTokenRoomType(result.data.data.branchID, "", "tabletScan","token")

                            dispatch(surveyAction.fillSurvey({
                                branchID: result.data.data.branchID,
                                roomNumber: "",
                            }));

                            if(resultMakeToken){
                                setMakeTokenSurveyScan(resultMakeToken.data.qr_token);
                            }

                        } else history.push("/survey/error")
                    } else history.push("/survey/error")
                }
               // setBranchID(result.data.data.branchID);
            }
            deCode();
        } else history.push("/survey/error");
    },[idBranch]);

    function makeTokenSurvey() {
        const makeTokenSurvey = async () => {
            try {
                const makeTokenSurveyInputByGuest = await surveyAPI.makeTokenRoomType(surveyData.branchID, 
                    surveyData.roomNumber ,"tabletInput", "Japan", "token");
                  //  console.log("makeTokenSurveyInputByGuest.data.qr_token", makeTokenSurveyInputByGuest.data.qr_token)
                    if(makeTokenSurveyInputByGuest) {
                      window.open("/survey/make_new/"+ makeTokenSurveyInputByGuest.data.qr_token,"_self")
                    }
            } catch (error) {
                console.log("error", error)
            }
        }

        makeTokenSurvey();
    }

    return (<div className="home" id="surveyHome">
        <div className="home-survey-title" >
           <img className="home-survey-title_img mr-2" src={logoAz} alt="logo_az" />
           <div className="home-survey-title_text">AZUMAYA SURVEY HOME</div>
        </div>
        <div className='home-survey-content'>
            <div style={{ flex: 1 , borderRight:'2px solid'}}>
                <div className="home-survey-content_title">
                    <div className="home-survey-content_title_text">Make Survey by Azumaya Tablet.</div>
                    <img className="home-survey-content_title_img" src={touchTablet} alt="touch_tablet" />
                </div>

                <div 
                  className="home-survey-content_input-content">
                    <div className="form-group" style={{textAlign:'center'}}>
                        <label for="exampleInputPassword1" style={{fontSize:'1.3rem'}}>Your room number?</label>
                        <input className="form-control" 
                                placeholder="Room Number" 
                                onChange= {e => dispatch(surveyAction.onChangeSurvey({value: e.target.value, target: "roomNumber",index:""}))}
                                style={{ width: '90%', margin: 'auto' }} />
                    </div>
                    <button className="btn btn-primary"
                        // onClick={()=>window.open("/survey/make_new/"+ idBranch,"_self")}
                        onClick={()=> makeTokenSurvey()}
                    >Start Survey</button>
                </div>
            </div>
            <div style={{ background:'white', flex: 1 }}>
                <div className="home-survey-content_title">
                    <div className="home-survey-content_title_text">Make Survey by your phone.</div>
                    <img className="home-survey-content_title_img" src={scanQR} alt="scan_qr" />
                </div>
                <div className="home-survey-content_qr-content">
                    <QRCode
                        level="L"
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={"https://azumayasurvey.com/survey/make_new/" + makeTokenSurveyScan}
                        viewBox={`0 0 256 256`}
                            />
                </div>
            </div>
        </div>

    </div>)
}

export default Home
