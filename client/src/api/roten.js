import axios from 'axios';
// SURVEY ROTEN

export function checkRoten(tokenRoom, date, token) {
    let newURL = "/roten/api/7faf6277-305b-4e82-b843-dd4e9f2e1971";
    return axios.post(`${newURL}`, {
            date,
            tokenCheck: tokenRoom,
        },{
        headers: { Authorization: token }
    });
};

export function postNewRotenSurvey(tokenRoom, data, token) {
    let newURL = "/roten/api/6b185f3a-d9c0-48a6-9ed6-96ccf18e04ed";
    return axios.post(`${newURL}`, {
             data,
            tokenCheck: tokenRoom,
        },{
        headers: { Authorization: token }
    });
};