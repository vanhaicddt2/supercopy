import { getType, surveyAction } from '../actions/index';
import { QUESTION5_SUB_ANSWER } from '../../components/body/survey/question';

const initialState = {
    isLoading : true,
    day: "",
    time : "",
    league: "Japan",
    table: "Online",
    roomNumber: "",
    branchID: "",
    from: "",
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: [
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
        {
            answer: 0,
            subAnswer : 0,
            nameSubAnswer: ""
        },
    ],
    question6: [],
    question7: 0,
    question8: "",
}

const surveyReducer = (state = initialState, action) => {
    switch(action.type){
        case getType (surveyAction.fillSurvey) : {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        }
        case getType (surveyAction.onChangeSurvey): {
            const { index, target, value } = action.payload;
            const newData = {...state};

            if(target === "question6") {
                if(newData["question6"].length > 0) {
                    if (!newData["question6"].includes(value)) {
                        newData["question6"].push(value);
                    } else {
                        newData["question6"].splice(newData["question6"].indexOf(value), 1);
                    }
                } else newData["question6"].push(value);
            }
            else if(target === "question5") {
                if(value > 2) {
                    newData["question5"][index].subAnswer  = 0 ;
                    newData["question5"][index].nameSubAnswer = "";
                }
                newData["question5"][index].answer = value;
            } else if (target === "question5Sub") {
                const {indexSub, indexQuestion5} = index;
                newData["question5"][indexQuestion5].subAnswer = value;
                newData["question5"][indexQuestion5].nameSubAnswer = QUESTION5_SUB_ANSWER.jap[indexQuestion5][indexSub];
            } else newData[target] = value;
            
            return newData;
        }
        case getType(surveyAction.resetSurvey):
            return initialState;
        default:
            return state
    }
}

export default surveyReducer;
