/*global module*/
module.exports.wrap = function (err, data) {
    'use strict';

    var result = {},
        messages = [];

    if (err) {
        if (err instanceof Array) {
            messages = err;
        } else {
            messages.push(err);
        }

        result.$$messages = messages;
    }

    if (data) {
        result.$$data = data;
    }

    return result;
};