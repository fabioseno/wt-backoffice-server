/*global require, module*/
var File        = require('../models/file'),
    dataMessage = require('../models/dataMessage'),
    pagination  = require('../utils/pagination');

module.exports.upload = function (req, res) {
    'use strict';

    var model = new File(req.body);

    model.save(function (err, result) {
        res.json(dataMessage.wrap(err, result));
    });
};