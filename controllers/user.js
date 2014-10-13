/*global require, module, jsSHA*/
var User        = require('../models/user'),
    dataMessage = require('../models/dataMessage'),
    pagination  = require('../utils/pagination'),
    JsSHA       = require('jssha');

module.exports.list = function (req, res) {
    'use strict';
    pagination.paginate(User, req, function (query, result) {
        query.exec(function (err, list) {
            result.list = list;
            res.json(dataMessage.wrap(err, result));
        });
    });
};

module.exports.get = function (req, res) {
    'use strict';

    User.findById(req.params.id, function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.create = function (req, res) {
    'use strict';

    // validations
    if (req.validations && req.validations.length > 0) {
        res.json(dataMessage.wrap(req.validations));
    }
    
    var shaObj = new JsSHA(req.body.password, "TEXT"),
        hash = shaObj.getHMAC(req.body.email, "TEXT", "SHA-1", "B64"),
        data,
        model;
    
    req.body.password = hash;
    
    model = new User(req.body);

    model.save(function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.save = function (req, res) {
    'use strict';
    
    // validations
    if (req.validations && req.validations.length > 0) {
        res.json(dataMessage.wrap(req.validations));
    }
    
    var data = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    };

    User.findOneAndUpdate({ _id: req.params.id }, data, function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.remove = function (req, res) {
    'use strict';

    User.findByIdAndRemove(req.params.id, function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};