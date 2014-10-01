/*global require, module*/
var User        = require('../models/user'),
    dataMessage = require('../models/dataMessage'),
    pagination  = require('../utils/pagination');

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
    
    var model = new User(req.body);

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
        password: req.body.password,
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