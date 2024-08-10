import axios from 'axios';

export const getData = (user, token) => {
    let newURL = "/user/take_copy/"+user
    return axios.get(`${newURL}`, {
        headers: { Authorization: token }
    });
};

export const saveData = (user, data, token) => {
    let newURL = "/user/save_copy/"+user
    return axios.post(`${newURL}`, data, {
        headers: { Authorization: token }
    });
};