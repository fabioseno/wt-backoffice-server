/*global require, module*/
var Session     = require('../models/session'),
    User        = require('../models/user'),
    dataMessage = require('../models/dataMessage'),
    config      = require('../config/config.json');

module.exports.isLoggedIn = function (req, res, next) {
    'use strict';

    if (req.path === '/login' || req.method === 'OPTIONS') {
        next();
    } else {
        Session.findById(req.get('SessionId'), function (err, session) {

            if (err) {
                res.json(500, dataMessage.wrap(err, session));
            }

            var unauthorized = true;

            if (session) {
                session.date.setHours(session.date.getHours() + config.authentication.timeout);

                if (session.date > new Date()) {
                    unauthorized = false;
                }
            }

            if (unauthorized) {
                res.status(401).json(dataMessage.wrap('Sua sessão expirou.<br />Favor realizar novo login!'));
            } else {
                Session.findByIdAndUpdate(req.get('SessionId'), { date: new Date() }, function (err, session) {
                    if (err) {
                        res.json(500, dataMessage.wrap(err, session));
                    }

                    next();
                });
            }
        });
    }
};