/*global require, module*/
var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    name: String,
    content: String
});

FileSchema.virtual('id').get(function () {
    'use strict';
    
    return this._id.toHexString();
});

FileSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('file', FileSchema);