/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var defaultController  = require('../controllers/default');
    
    router.all('*', defaultController.all);
    
    router.get('/', defaultController.root);
    
};