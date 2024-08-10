import axios from 'axios';
// SURVEY ROTEN

export function getData(user, token) {
    let newURL = "/user/take_copy/"+user;
    return axios.get(`${newURL}`,{
        headers: { Authorization: token }
    });
};

export function saveData(user, data, token) {
    let newURL = "/user/save_copy/"+user;
    return axios.post(`${newURL}`,data,{
        headers: { Authorization: token }
    });
};