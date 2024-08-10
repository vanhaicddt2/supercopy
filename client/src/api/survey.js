import axios from 'axios';

export function checkSurveyOnDay(tokenRoom, date, token) {
    let newURL = "/survey/api/4f41667e-f136-47a7-b4e1-f00e61346936";
    return axios.post(`${newURL}`, {
            date,
            tokenCheck: tokenRoom,
        },{
        headers: { Authorization: token }
    });
};

export function checkSurveyOtherDay(tokenRoom, token) {
    let newURL = "/survey/api/53bbe456-c811-4fa5-b18b-f778425ac81a";
    return axios.post(`${newURL}`, {
            tokenCheck: tokenRoom,
        },{
        headers: { Authorization: token }
    });
};

export function getSurveyById(branchID, id, token) {
    let newURL = "/survey/api/10ed459a-afac-4b89-8eda-9ef7d61b33e9";
    return axios.post(`${newURL}`, {
        branchID, 
        id
    } ,{
        headers: { Authorization: token }
    });
};

export function updateSurvey(tokenRoom, data, token) {
    let newURL = "/survey/api/d56038ea-2c93-4e30-8dd9-39cedd756c14";
    return axios.post(`${newURL}`, {
        tokenCheck: tokenRoom,
        data
    } ,{
        headers: { Authorization: token }
    },{headers: { Authorization: token } });
}

export function makeTokenRoom(branchID, room, langue,  token) {
    let newURL = "/survey/api/make_token_room";
    return axios.post(`${newURL}`,{
        branchID, 
        langue,
        room, 
    },{
        headers: { Authorization: token }
    });
}

// makeTokenRoomPublic
export function makeTokenRoomType(branchID, room, type, league, token) {
    let newURL = "/survey/api/make_token_room_public"
    return axios.post(`${newURL}`,{
        branchID, 
        room, 
        league,
        type
    },{
        headers: { Authorization: token }
    });
}

// make multi QR code room
export function makeTokenMultiRoom(branchID, room, type, league, token) {
    let newURL = "/survey/api/make_token_multi_room"
    return axios.post(`${newURL}`,{
        branchID, 
        room, 
        league,
        type
    },{
        headers: { Authorization: token }
    });
}

export function deCodeTokenRoom(tokenRoom, token) {
    let newURL = "/survey/api/fdd318a1-5aa4-427d-b5f3-b0ad95768ba8/"  + tokenRoom;
    return axios.get(`${newURL}`,{
        headers: { Authorization: token }
    });
}

