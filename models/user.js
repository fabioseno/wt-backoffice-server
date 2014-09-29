/*global require, module*/
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: String
});

UserSchema.virtual('id').get(function () {
    'use strict';
    
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('user', UserSchema);