const router = require('express').Router();
const userCtrl = require('../controller/userCtrl.js');

router.post('/save_copy/:name', userCtrl.saveCopy);

router.get('/take_copy/:name', userCtrl.takeData);

router.get('/take_copy', userCtrl.takeData);

module.exports = router;
