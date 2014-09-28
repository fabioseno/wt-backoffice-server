/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var authController  = require('../controllers/auth');
    
    router.post('/login', authController.login);
    
    router.get('/profile', authController.profile);
    
    router.post('/logout', authController.logout);
    
};