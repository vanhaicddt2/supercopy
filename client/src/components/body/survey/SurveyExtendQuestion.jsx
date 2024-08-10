import React from "react";
import SurveyInputAnswer from "./SurveyInputAnswer";
import { useDispatch } from "react-redux";

function SurveyExtendQuestion() {
    const dispatch = useDispatch();
    
    function onChangeData(value,target,index) {
        dispatch(surveyAction.onChangeSurvey({value, target, index}));
    }

    return (<>
            <SurveyInputAnswer
            data = {QUESTION.jap.questionroomNumber}
            onChangeData= {onChangeData}
            isEdit={isEdit}
            question = "roomNumber"
        />
    </>)
}

export default SurveyExtendQuestion;