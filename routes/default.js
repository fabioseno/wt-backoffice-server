/*global module, require*/
module.exports = function (router) {
    'use strict';

    var defaultController           = require('../controllers/default'),
        authenticationMiddleware    = require('../middlewares/authentication');

    router.all('*', defaultController.all, authenticationMiddleware.isLoggedIn);

    router.get('/', defaultController.root);

};