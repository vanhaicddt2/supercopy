import React from "react";
import { useSelector } from "react-redux";

function SurveyInputAnswer(props) {
    const { isEdit, question, dataShow , heightInput} = props;

    function onChangeData(value) {
       props.onChangeData(value,props.question === "roomNumber" ? props.question : "question" + props.question)
    }
    
    return (<div className="pt-2">
        {
                props.data.title === "" ? " " :
                <div style={{background:'aqua', fontWeight:"550"}}>
                        {((props.question === "roomNumber" || props.question === "1") ? "*" : props.question + ". ") + props.data.title}
                        </div>
        }
        {
                props.question === "roomNumber"
                ? <input style={{width : '100%', padding: '2px'}} disabled={!isEdit}
                        maxLength={4}
                        onChange = {e => onChangeData(e.target.value)}></input> :      
                <textarea id={question}
                        disabled={!isEdit}
                        value= {props.question === "roomNumber" ? dataShow.roomNumber : dataShow["question" + question]}
                        style={{width : '100%', height: props.question === "roomNumber" ? '20px' : (heightInput ? heightInput +'px' :'auto')}}
                        onChange = {e => onChangeData(e.target.value)}
                        onInput={()=> props.auto_grow(question)}></textarea>
        }
    </div>)
}

export default SurveyInputAnswer;
