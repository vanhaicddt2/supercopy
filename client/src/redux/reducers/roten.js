import { getType, rotenAction } from '../actions/index';
// import { QUESTION5_SUB_ANSWER } from '../../components/body/survey/question';

const initialState = {
    isLoading : true,
    day: "",
    time : "",
    league: "Japan",
    table: "roomScan",
    roomNumber: "",
    branchID: "",
    from: "",
    question1: "",
}

const surveyReducer = (state = initialState, action) => {
    switch(action.type){
        case getType (rotenAction.fillRoten) : {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        }
        case getType (rotenAction.onChangeRoten): {
            const { index, target, value } = action.payload;
            const newData = {...state};
            newData[target] = value;
            return newData;
        }
        case getType(rotenAction.resetRoten):
            return initialState;
        default:
            return state
    }
}

export default surveyReducer;

