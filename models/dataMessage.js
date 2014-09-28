/*global module*/
var messages = [],

    data,

    addMessage = function (message, type) {
        'use strict';
        
        messages.push({ message: message, type: type });
    },

    wrap = function (err, result) {
        'use strict';
        
        if (err) {
            messages.push(err);
        }
        
        data = result;
        
        return data;
    };


module.exports = {
    messages: messages,
    data: data,
    wrap: wrap
};