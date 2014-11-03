/*global module*/
module.exports.all = function (req, res, next) {
    'use strict';
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, SessionId');
    res.header('Access-Control-Expose-Headers', 'X-SessionID');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    
    next();
};

module.exports.root = function (req, res, next) {
    'use strict';
    
    return res.status(200).end('home');
};