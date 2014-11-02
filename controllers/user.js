/*global require, module, jsSHA*/
var User        = require('../models/user'),
    dataMessage = require('../models/dataMessage'),
    pagination  = require('../utils/pagination'),
    JsSHA       = require('jssha');

module.exports.list = function (req, res) {
    'use strict';
    pagination.paginate(User, req, function (query, result) {
        query.exec(function (err, list) {
            if (err) {
                res.json(500, dataMessage.wrap(err, list));
            }

            result.list = list;
            res.json(dataMessage.wrap(err, result));
        });
    });
};

module.exports.get = function (req, res) {
    'use strict';

    User.findById(req.params.id, function (err, result) {
        if (err) {
            res.json(dataMessage.wrap(err, result));
        }

        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.create = function (req, res) {
    'use strict';

    // validations
    if (req.validations && req.validations.length > 0) {
        res.json(dataMessage.wrap(req.validations));
    }

    var data, model;

    model = new User(req.body);

    model.save(function (err, result) {
        if (err) {
            res.json(dataMessage.wrap(err, result));
        }

        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.save = function (req, res) {
    'use strict';

    var hasErrors = false, data;

    // validations
    if (req.validations && req.validations.length > 0) {
        res.json(dataMessage.wrap(req.validations));
        hasErrors = true;
    }

    if (!hasErrors) {
        data = {
            name: req.body.name,
            email: req.body.email,
            status: req.body.status
        };

        /*jslint nomen: true*/
        User.findOneAndUpdate({ _id: req.params.id }, data, function (err, result) {
            if (err) {
                res.json(dataMessage.wrap(err, result));
            }

            res.json(dataMessage.wrap(err, result));
        });
        /*jslint nomen: false*/
    }
};

module.exports.remove = function (req, res) {
    'use strict';

    User.findByIdAndRemove(req.params.id, function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};

module.exports.resetPassword = function (req, res) {
    'use strict';

    var hasErrors = false, data;

    // validations
    if (req.validations && req.validations.length > 0) {
        res.json(dataMessage.wrap(req.validations));
        hasErrors = true;
    }

    if (!hasErrors) {
        data = {
            password: req.body.password
        };

        /*jslint nomen: true*/
        User.findOneAndUpdate({ _id: req.params.id }, data, function (err, result) {
            if (err) {
                res.status(500).json(dataMessage.wrap(err, result));
            }

            res.json(dataMessage.wrap(err, result));
        });
        /*jslint nomen: false*/
    }
};

module.exports.changePassword = function (req, res) {
    'use strict';

    var hasErrors = false, data;

    // validations
    if (req.validations && req.validations.length > 0) {
        res.json(dataMessage.wrap(req.validations));
        hasErrors = true;
    }

    if (!hasErrors) {
        data = {
            password: req.body.newPassword
        };

        /*jslint nomen: true*/
        User.findOneAndUpdate({ email: req.body.email, password: req.body.password }, data, function (err, result) {

            if (err) {
                res.status(500).json(dataMessage.wrap(err, result));
            }

            if (result) {
                res.json(dataMessage.wrap(err, result));
            } else {
                res.status(500).json(dataMessage.wrap('Usuário ou senha inválidos!'));
            }
        });
        /*jslint nomen: false*/
    }
};