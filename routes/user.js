/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var userController  = require('../controllers/user');
    
    router.post('/users', userController.list);
    
    router.get('/user/:id', userController.get);
    
    router.post('/users/create', userController.create);
    
    router.put('/user/:id', userController.save);
    
    router['delete']('/user/:id', userController.remove);
    
};