const { v1: uuidv1, v3: uuidv3, v4: uuidv4, v5: uuidv5 } = require('uuid');

const supportOther = {
    makeRandomIDv1: () => {
        return uuidv1();
    },
    makeRandomIDv3: () => {
        return uuidv3();
    },
    makeRandomIDv4: () => {
        return uuidv4();
    },
    makeRandomIDv5: () => {
        return uuidv5();
    },

}

module.exports = supportOther;