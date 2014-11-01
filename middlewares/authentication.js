/*global require, module*/
var Session     = require('../models/session'),
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
                console.log(session.date);
                
                session.date.setHours(session.date.getHours() + config.authentication.timeout);

                console.log(session.date);
                console.log(new Date());
                console.log(session.date > new Date());


                if (session.date > new Date()) {
                    unauthorized = false;
                }
            }

            if (unauthorized) {
                res.status(401).send('Access denied.');
            } else {
                next();
            }
        });
    }
};