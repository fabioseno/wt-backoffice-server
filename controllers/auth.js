/*global require, module*/
var User        = require('../models/user');
var Session     = require('../models/session');
var dataMessage = require('../models/dataMessage');

module.exports.login = function (req, res) {
    'use strict';

    User.findOneAndUpdate({ email: req.body.email, password: req.body.password }, { lastAccess: new Date() }, function (err, user) {
        if (err) {
            res.json(500, dataMessage.wrap(err, user));
        }

        if (user) {
            Session.remove({ email: req.body.email }, function (err, sessions) {
                var session = new Session({ email: req.body.email, date: new Date() });

                session.save(function (err, session) {
                    res.header('X-SessionID', session.id);
                    res.json(dataMessage.wrap(err, user));
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
        res.status(200).end();
    });
};