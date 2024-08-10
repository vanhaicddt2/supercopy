import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const surveyAction = createActions({
    resetSurvey : undefined,
    fillSurvey: (payload) => payload,
    onChangeSurvey: (payload) => payload,
});

export const rotenAction = createActions({
    resetRoten : undefined,
    fillRoten: (payload) => payload,
    onChangeRoten: (payload) => payload,
});
