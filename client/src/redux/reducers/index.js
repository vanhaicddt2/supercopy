import {combineReducers} from 'redux'
import surveyReducer from './survey'
import rotenReducer from './roten'

export default combineReducers({
    survey : surveyReducer,
    roten : rotenReducer
});
