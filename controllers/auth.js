/*global require, module*/
var User        = require('../models/user');
var Session     = require('../models/session');
var dataMessage = require('../models/dataMessage');

module.exports.login = function (req, res) {
    'use strict';
    
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, result) {
        if (result) {
            Session.remove({ email: req.body.email }, function (err, sessions) {
                var session = new Session({ email: req.body.email, updateDate: new Date() });

                session.save(function (err, session) {
                    res.header('X-SessionID', session.id);
                    res.json(dataMessage.wrap(err, result));
                });
            });
        } else {
            res.status(401).end();
        }
    });
};

module.exports.profile = function (req, res) {
    'use strict';

};

module.exports.logout = function (req, res) {
    'use strict';

    Session.remove({ email: req.body.email }, function (err, sessions) {
        res.redirect('/');
    });
};