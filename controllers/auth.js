/*global require, module*/
var User        = require('../models/user');
var Session     = require('../models/session');
var dataMessage = require('../models/dataMessage');

module.exports.login = function (req, res) {
    'use strict';

    User.findOneAndUpdate({ email: req.body.email, password: req.body.password, status: 'A' }, { lastAccess: new Date() }, function (err, user) {
        if (err) {
            return res.status(500).json(dataMessage.wrap(err, user));
        }

        if (user) {
            // change for update here
            Session.remove({ email: req.body.email }, function (err, sessions) {
                var session = new Session({ email: req.body.email, date: new Date() });

                session.save(function (err, session) {
                    res.header('X-SessionID', session.id);
                    return res.json(dataMessage.wrap(err, user));
                });
            });
        } else {
            return res.status(401).json(dataMessage.wrap('Usuário ou senha inválidos!'));
        }
    });
};

module.exports.profile = function (req, res) {
    'use strict';

};

module.exports.logout = function (req, res) {
    'use strict';

    Session.remove({ email: req.body.email }, function (err, sessions) {

        if (err) {
            return res.status(500).json(dataMessage.wrap(err, sessions));
        }

        return res.end();
    });
};