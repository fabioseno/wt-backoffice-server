/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController  = require('../controllers/user'),
        userValidation  = require('../middlewares/user');
    
    router.post('/users', userController.list);
    
    router.get('/user/:id', userController.get);
    
    router.post('/users/create', userValidation.required, userValidation.emailExists, userController.create);
    
    router.put('/user/:id', userValidation.required, userValidation.emailExists, userController.save);
    
    router['delete']('/user/:id', userController.remove);
    
};