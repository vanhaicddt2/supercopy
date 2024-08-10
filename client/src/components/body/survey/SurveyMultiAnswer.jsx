import React from "react";
import { useSelector } from "react-redux";

function SurveyMultiAnswer(props) {
    const { question, isEdit } = props;
    const surveyData = useSelector(state => state.survey);
    const questNumber = "question " +question;
    function render(data) {
        let result = [];

        data.forEach((item, index) => {
            result.push(
                <div className="form-check multi_answer-answer">
                <label className="form-check-label multi_answer-answer_label">
                    <input type="checkbox" className="form-check-input" name={questNumber} 
                        checked = {surveyData["question"+question].includes(index + 1)}
                        onClick={!isEdit ? "" : ()=> props.onChangeData(index + 1,"question"+question.slice(0,1),"")}
                    />{item}
                </label>
                </div>
            )
        })
        return result;
    }

    return ( <div className="pt-2">        
        <div style={{background:'aqua', fontWeight:"550"}}>{props.question + ". " +props.data.title}</div>
        <div className="d-flex flex-wrap multi_answer">
        {render(props.data.answer)}
        </div>
    </div>)
}

export default SurveyMultiAnswer;
