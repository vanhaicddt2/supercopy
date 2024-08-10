import React from "react";
import { useSelector } from "react-redux";
import './survey.css'

function SurveySelectOneAnswer(props) {
    const { question, isEdit } = props;
    const surveyData = useSelector(state => state.survey);
    const questNumber = "question " + question;

    function render(data) {
        let result = [];

        data.forEach((item, index) => {
            result.push(
                <div className="form-check one_answer-answer" >
                    <label className="form-check-label one_answer-answer_label">
                        <input type="radio" className="form-check-input" name={questNumber} 
                            // disabled={!isEdit}
                            checked = {surveyData["question"+question] === (index + 1)}
                            onClick={!isEdit ? "" :()=> props.onChangeData(index + 1, "question"+question, "")}
                        />{item}
                    </label>
                </div>
            )
        })
        return result;
    }

    return (
        <div className="pt-2">
            <div style={{background:'aqua', fontWeight:"550"}}>{props.question + ". " +props.data.title}</div>
            <div className="d-flex flex-wrap one_answer">
               {render(props.data.answer)}
            </div>
        </div>
    )
}

export default SurveySelectOneAnswer;
