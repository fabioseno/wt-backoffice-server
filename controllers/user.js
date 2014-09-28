/*global require, module*/
var User        = require('../models/user'),
    dataMessage = require('../models/dataMessage'),
    Pagination  = require('../utils/pagination');

module.exports.list = function (req, res) {
    'use strict';
    Pagination.paginate(User, req, function (query, page) {
        query.find(function (err, result) {
            page.list = result;
            res.json(dataMessage.wrap(err, page));
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

    var user = new User(req.body);

    user.save(function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.save = function (req, res) {
    'use strict';
    
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status
    };
    console.log(req.params.id);
    
    User.findOneAndUpdate(req.params.id, data, {}, function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.remove = function (req, res) {
    'use strict';

    User.findByIdAndRemove(req.params.id, function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};