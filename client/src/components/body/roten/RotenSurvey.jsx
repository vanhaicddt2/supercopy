import React, { useEffect, useState } from "react";

// other
import { QUESTION_ROTEN } from './questionRoten';
import { useDispatch, useSelector } from "react-redux";
import SurveyInputAnswer from "../survey/SurveyInputAnswer";
import { rotenAction } from '../../../redux/actions';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import flagEng from '../../../units/img/flag_eng.png';
import flagJap from '../../../units/img/flag_jap.png';
import * as rotenAPI from '../../../api/roten';
// import * as surveyAPI from '../../../api/survey';
import IsLoading from "../future/IsLoading";

function RotenSurvey() {
    const dispatch = useDispatch();
    let history = useHistory();

    const rotenData = useSelector(state => state.roten);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisitor, setIsVisitor] = useState(false);
    const { idRoten } = useParams();
    let langue = "jap";

    useEffect(()=> {
        document.title = 'Roten Survey';
        changeLangue();
    },[]); 

    function changeLangue() {
        if(rotenData.league === "Japan") return langue = "jap";
        else return langue = "eng"
    }

    function onChangeData(value,target,index) {
        dispatch(rotenAction.onChangeRoten({value, target, index}));
    }

    function postNewRoten() {
        const postToServer = async () => {
            try {
                const result = await rotenAPI.postNewRotenSurvey(idRoten, rotenData, "token");
            //    console.log("result", result);
                if(result) {
                    if(result.data.status ===1) {
                      window.open("/survey/complete/"+langue ,"_self");
                    } else if (result.data.status === 3) {
                        history.push("/survey/error");
                    }
                } else alert("error when load data");

            } catch (error) {
               // console.log(error);
                alert("error when post survey");
            }
        }
        setIsLoading(true);
        postToServer();
    }

    function auto_grow(id) {
        const element = document.getElementById(id)
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      }

    return (
        <div style={{padding:'8px'}}>
            { isLoading && <IsLoading /> }

            <h1 style={{ color:'#482979', textAlign:'center', paddingTop:'4px' }}>ROTEN SURVEY</h1>

            <div style={{textAlign:'center'}}>
                <img src={flagJap} 
                    alt="jap" 
                    style={{ width: "35px" }}
                    className={rotenData.league === "Japan" ? "" : "img-gray_scale"}
                    onClick = {() => onChangeData("Japan", "league","")}
                    />

                <img src={flagEng} 
                    alt="eng"
                    style={{ width: "35px" }}
                    className={rotenData.league !== "Japan" ? "" : "mr-2 img-gray_scale" }
                    onClick = {() => onChangeData("English", "league","")}
                    />
            </div>
            <br/>
            <div style={{fontSize:'1rem'}}>{QUESTION_ROTEN[changeLangue()].title1}</div>
            <div style={{fontSize:'1rem'}}>{QUESTION_ROTEN[changeLangue()].title2}</div>
            <div style={{fontSize:'1rem'}}>{QUESTION_ROTEN[changeLangue()].title3}</div>
 
         {/* <SurveyInputAnswer
                data = {QUESTION_ROTEN[langue].questionroomNumber}
                onChangeData= {onChangeData}
                dataShow={rotenData}
                isEdit={!isVisitor}
                auto_grow={auto_grow}
                question = "roomNumber"
            />

        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
            checked = {isVisitor} onClick={()=>setIsVisitor(!isVisitor)}/>
            <label class="form-check-label" for="flexCheckDefault">
                Visitor
            </label>
        </div> */}

            <SurveyInputAnswer
                data = {QUESTION_ROTEN[langue].question1}
                onChangeData= {onChangeData}
                dataShow={rotenData}
                isEdit={true}
                auto_grow={auto_grow}
                heightInput = {120}
                question = "1"
                />

            <div style={{textAlign: 'center', marginTop:'4px'}}>
                <button className="btn btn-primary" 
                onClick={() => postNewRoten()}
                    style={{width:"200px"}}
                    disabled={rotenData.question1 === ""}
                >{langue === "eng"? "Complete": "完了"}</button>
            </div>

    </div>)
}

export default RotenSurvey;
