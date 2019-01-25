var mongoose = require('mongoose');

var User = mongoose.model('Users', {
    name: {
        type: String,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        trim: true,
        minlength: 1
    }
});

module.exports.User = User;