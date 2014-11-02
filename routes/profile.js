/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController = require('../controllers/user'),
        userValidation = require('../middlewares/user');
    
    router.post('/changePassword', userValidation.changePasswordRequired, userController.changePassword);
    
};