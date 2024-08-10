import React from "react";
import { useSelector } from "react-redux";

import { QUESTION5_SUB_ANSWER, QUESTION5_TITLE_COL, QUESTION5_TITLE_ROW } from './question';
import img1start from '../../../units/img/1start.png';
import img2start from '../../../units/img/2start.png';
import img3start from '../../../units/img/3start.png';
import img4start from '../../../units/img/4start.png';
import img5start from '../../../units/img/5start.png';
import { BRANCH_HAVE_NOTE_MASSAGE } from '../../../units/support/branch';

import './survey.css';

function SurveyTableAnswer(props) {
    const { isEdit, langue } = props;
    const surveyData = useSelector(state => state.survey);

    function takeImg(img) {
        switch(img) {
            case 1 : return img1start;
            case 2 : return img2start;
            case 3 : return img3start;
            case 4 : return img4start;
            case 5 : return img5start;
            default : return "";
        }
    }

    function render() {
        let result = [];
        function renderInputRadio(index) {
            let result2 = [];
            QUESTION5_TITLE_ROW[langue].forEach((item, indexRow) => {
                result2.push(
                    <input 
                        type="radio" name={"question5_"+index} 
                        className="tab_answer-radio"
                        checked = {surveyData.question5[index].answer === (indexRow + 1)}
                        onClick={!isEdit ? "" : () => props.onChangeData(indexRow + 1,"question5",index)}
                    />)
            })
            return result2;
        }

        function renderSub(dataRender, index) {
            let result = [];
            dataRender.forEach((item, indexSub) => {
                result.push(
                    <div className="form-check" style={{width: '50%'}}>
                    <label className="form-check-label tab-answer_answer-content-sub_label">
                        <input type="radio" className="form-check-input" name={"sub"+indexSub} 
                            checked = {surveyData["question5"][index].subAnswer === (indexSub + 1)}
                            onClick={()=> props.onChangeData(indexSub + 1,"question5Sub", {indexSub, indexQuestion5: index})}
                        />{item}
                    </label>
                    </div>
                )
            })

            return result;
        }

        QUESTION5_TITLE_COL[langue].forEach((item, index) => {
           if(BRANCH_HAVE_NOTE_MASSAGE.includes(Number(surveyData.branchID)) && index === 9) {

           } else {
                result.push(<div style={{width:'100%', marginLeft: '4px'}} className="d-flex tab-answer_answer">
                    <div className="tab-answer_answer-title">{item}</div>
                    <div className="tab-answer_answer-content">
                        <div className="tab-answer_answer-content_main">
                            {renderInputRadio(index) }
                        </div>
                        { QUESTION5_SUB_ANSWER[langue][index] && 
                        (surveyData.question5[index].answer === 1 || surveyData.question5[index].answer === 2)
                        && <div>
                            <div  className="tab-answer_answer-content-sub_title">{QUESTION5_SUB_ANSWER[langue].title}:</div>
                            <div>
                            <div>
                                <div className="d-flex flex-wrap">
                                {renderSub(QUESTION5_SUB_ANSWER[langue][index], index)}
                                </div>
                            </div>
                            </div> 
                        </div> }
                    </div>
                </div>)
           }
        })

        return result;
    }

    function renderRowQuestion5() {
        let result = [];
        for (let i = 5; i > 0; i--) {
          result.push(<li className="tab_answer-row_content d-flex flex-column justify-content-center">
                        {/* <div 
                        className="tab_answer-row_content-text"
                        >{QUESTION5_TITLE_ROW[langue][i-1]}</div> */}
                        <div className={langue ==="jap" ? "tab_answer-row_content-text" :"tab_answer-row_content-text_eng"}
                              dangerouslySetInnerHTML={{ __html: QUESTION5_TITLE_ROW[langue][i-1] }}
                        />

                        <img
                            width={20}
                            alt="img"
                            className="tab_answer-row_content-img"
                            src={takeImg(i)}></img>
                      </li>)}
        return  result;
    }

    return (
        <div className="pt-2">
            <div style={{ background:'aqua', fontWeight:"550" }}>{props.question + ". " +props.data.title}</div>
            <div style={{ background:'aqua', fontWeight:"450", fontSize:'0.8rem'}}>{props.data.title2}</div>
            <div className="tab_answer">
                <ul className="d-flex mt-2 tab_answer-row">
                    {renderRowQuestion5()}
                </ul>
                <div className="d-flex flex-wrap">
                    {render(props.data)}
                </div>
            </div>
        </div>
    )
}

export default SurveyTableAnswer;
