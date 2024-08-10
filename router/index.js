function route(app) {
    app.use('/user', require('./userRouter.js'));
}

module.exports = route;
