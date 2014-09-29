/*global module*/
module.exports.all = function (req, res, next) {
    'use strict';
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, SessionId');
    res.header('Access-Control-Expose-Headers', 'X-SessionID');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    
    console.log(req.body);
    
    next();
};

module.exports.root = function (req, res, next) {
    'use strict';
    
    res.send('home');
};