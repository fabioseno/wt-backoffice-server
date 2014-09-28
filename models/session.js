/*global require, module*/
var mongoose    = require('mongoose');
var dataMessage = require('../models/dataMessage');

var SessionSchema = new mongoose.Schema({
    email: String,
    date: Date
});

module.exports = mongoose.model('session', SessionSchema);