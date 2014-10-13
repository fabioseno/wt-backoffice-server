/*global module, require*/
module.exports = function (router) {
    'use strict';
    
    var fileController  = require('../controllers/file');
    
    router.post('/files/upload', fileController.upload);
    
};