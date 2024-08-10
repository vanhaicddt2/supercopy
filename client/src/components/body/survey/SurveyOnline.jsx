import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

// Component
import SurveySelectOneAnswer from "./SurveySelectOneAnswer";
import SurveyInputAnswer from "./SurveyInputAnswer";
import SurveyMultiAnswer from "./SurveyMultiAnswer";
import SurveyTableAnswer from "./SurveyTableAnswer";

// action & api & support
import { surveyAction } from '../../../redux/actions';
import { getToday } from '../../../units/support/date';

import flagEng from '../../../units/img/flag_eng.png';
import flagJap from '../../../units/img/flag_jap.png';

import * as surveyAPI from '../../../api/survey';
// other
import { QUESTION, QUESTION_AZPP } from './question';
// import LoadingIcon from '../../../units/img/loading.gif';
import IsLoading from "../future/IsLoading";

function SurveyOnline() {
    const dispatch = useDispatch();
    let history = useHistory();

    const surveyData = useSelector(state => state.survey);
    const [isEdit, setIsEdit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowRoomNumber, setIsShowRoomNumber] = useState(false);
    const { idRoom , idSurvey, idWaiting } = useParams();
    let langue = "jap";

    useEffect(()=> {
        if(idRoom) checkSurveyOnToday("today");
        if(idSurvey) checkSurveyByID();
        if(idWaiting) checkSurveyOnToday("otherDay");
       // console.log("idRoom 12", idRoom)
        //console.log("idWaiting 34", idWaiting)

        changeLangue();
    },[]); 

    function changeLangue() {
        if(surveyData.league === "Japan" || surveyData.league === "japan") return langue = "jap";
        else return langue = "eng"
    }

    function checkSurveyOnToday(type) {
        const loadServer = async () => {
            const today = getToday();
            let result ;

            if(type === "today") {
               // console.log("vo here today")
                result = await surveyAPI.checkSurveyOnDay(idRoom, today, "token");
               // console.log("result today", result);
            } else {
               // console.log("vo here other day")

                result = await surveyAPI.checkSurveyOtherDay(idWaiting, "token");
               // console.log("result other day", result);
            }
      
            if(result) {
                if(result.data.status ===1) {
                    if(type === "otherDay" && result.data.data.length === 0 ) {
                        dispatch(surveyAction.fillSurvey({
                            branchID: result.data.branchID,
                            from : result.data.from,
                            league: result.data.league,
                            roomNumber: result.data.roomNumber === "home"? "" :result.data.roomNumber,
                        }))
                      //  console.log("vo here type === otherDay ")
                       history.push("/survey/make/"+result.data.qr_token)
                    }
                    if(result.data.roomNumber === "home" || result.data.roomNumber === "") setIsShowRoomNumber(true);               
                    history.push("/survey/view/" + String(result.data.branchID).padStart(2, '0') + result.data.data._id);
                    setIsEdit(false);
                    dispatch(surveyAction.fillSurvey({
                        ...result.data.data,
                    }))
                } else if (result.data.status === 3) {
                    history.push("/survey/error");
                } else {
                    dispatch(surveyAction.fillSurvey({
                        from : result.data.from,
                        branchID: result.data.branchID,
                        league: result.data.league,
                        roomNumber: result.data.roomNumber === "home"? "" :result.data.roomNumber,
                    }));
                    if(result.data.roomNumber === "home" || result.data.roomNumber === "" ) setIsShowRoomNumber(true);
                    if(type === "today") history.push("/survey/make/"+result.data.qr_token);
                }
            } else alert("error when load data");

        }
        loadServer();
    }

    function checkSurveyByID() {
        const loadServer = async () => {
            const branchID = Number(idSurvey.slice(0,2));
            const idSurveyQuery = idSurvey.slice(2, idSurvey.length);
            const result = await surveyAPI.getSurveyById(branchID, idSurveyQuery, "token");

            if(result) {
                if(result.data.status ===1) {
                    setIsEdit(false);
                    dispatch(surveyAction.fillSurvey({
                        ...result.data.data,
                        branchID
                    }))
                } else {
                    history.push("/survey/error");
                }
            } else alert("error when load data")
        }
        loadServer();
    }

    function postNewSurvey() {
        const loadServer = async () => {
            const result = await surveyAPI.updateSurvey(idWaiting, surveyData, "token");
         ///   const makeTokenHome = await surveyAPI.makeTokenRoomType(surveyData.branchID, "home", "tabletInput", "token");
            if(result) {
                if(result.data.status ===1) {
                    window.open("/survey/complete/"+langue + (surveyData.from  === "tabletInput" ? ("/" + idWaiting) : "") ,"_self");
                } else {
                    history.push("/survey/error");
                }
            } else alert("error when load data");
        }
       setIsLoading(true);
       loadServer();
    }

    function onChangeData(value,target,index) {
        dispatch(surveyAction.onChangeSurvey({value, target, index}));
    }

    function auto_grow(id) {
        const element = document.getElementById(id)
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      }

    return (<div style={{padding:'8px'}}>

        { isLoading && <IsLoading /> }
        <h1 style={{ color:'#482979', textAlign:'center', paddingTop:'4px' }}>AZUMAYA SURVEY</h1>

        { idWaiting && <div style={{textAlign:'center'}}>
            <img src={flagJap} 
                alt="jap" 
                style={{ width: "35px" }}
                className={surveyData.league === "Japan" ? "" : "img-gray_scale"}
                onClick = {() => onChangeData("Japan", "league","")}
                />

            <img src={flagEng} 
                alt="eng"
                style={{ width: "35px" }}
                className={surveyData.league !== "Japan" ? "" : "mr-2 img-gray_scale" }
                onClick = {() => onChangeData("English", "league","")}
                />
        </div> }
        <div style={{ textAlign:'center', width:'100%'}} >
           {/* { idSurvey && <div>Branch Azumaya {coverIDToFullName(Number(surveyData.branchID))} || Room {surveyData.roomNumber}</div>} */}
           { idSurvey && <div style={{ textAlign:'center', width:'100%'}}>Time make: {surveyData.day + " @" + surveyData.time}</div>}
           { idSurvey && <span>---</span> }
        </div>

        <div className="survey-title">{QUESTION[changeLangue()].title1}</div>
        <div className="survey-title">{surveyData.branchID === 11 ? QUESTION_AZPP[changeLangue()].title2 : QUESTION[changeLangue()].title2}</div>
        <div className="survey-title">{QUESTION[changeLangue()].title3}</div>
        
       {
        isShowRoomNumber && <SurveyInputAnswer
            data = {QUESTION[langue].questionroomNumber}
            dataShow={surveyData}
            onChangeData= {onChangeData}
            isEdit={isEdit}
            auto_grow={auto_grow}
            question = "roomNumber"
            />
       }

         {/*<SurveyInputAnswer
            data = {QUESTION.jap.questionbranchID}
            onChangeData= {onChangeData}
            isEdit={isEdit}
            question = "branchID"
        /> */}

        <SurveySelectOneAnswer 
            data = {QUESTION[langue].question1}
            question = "1"
            onChangeData= {onChangeData}
            isEdit={isEdit}
        />
        <SurveySelectOneAnswer 
            data = {QUESTION[langue].question2}
            question = "2"
            onChangeData= {onChangeData}
            isEdit={isEdit}
        />
        <SurveySelectOneAnswer 
            data = {surveyData.branchID === 11 ? QUESTION_AZPP[langue].question3 :QUESTION[langue].question3}
            question = "3"
            onChangeData= {onChangeData}
            isEdit={isEdit}
        />
        <SurveySelectOneAnswer 
            data = {surveyData.branchID === 11 ? QUESTION_AZPP[langue].question4 :QUESTION[langue].question4}
            question = "4"
            onChangeData= {onChangeData}
            isEdit={isEdit}
        />
        <SurveyTableAnswer
            data = {QUESTION[langue].question5}
            onChangeData= {onChangeData}
            isEdit={isEdit}
            langue = {langue}
            question = "5"
        />
        <SurveyMultiAnswer 
            data = {QUESTION[langue].question6}
            onChangeData= {onChangeData}
            isEdit={isEdit}
            question = "6"
        />
        <SurveySelectOneAnswer 
            data = {QUESTION[langue].question7}
            question = "7"
            onChangeData= {onChangeData}
            isEdit={isEdit}
        />
        <SurveyInputAnswer
            data = {QUESTION[langue].question8}
            onChangeData= {onChangeData}
            dataShow={surveyData}
            isEdit={isEdit}
            auto_grow={auto_grow}
            question = "8"
        />

      { isEdit && <div style={{textAlign: 'center'}}>
         <button className="btn btn-primary" 
            onClick={() => postNewSurvey()}
            style={{width:"200px"}}
            disabled={surveyData.branchID === ""}
         >{langue === "eng"? "Complete": "完了"}</button>
      </div> }
    </div>)
}

export default SurveyOnline;
