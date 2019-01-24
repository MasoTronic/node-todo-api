var mongoose = require('mongoose');

var User = mongoose.model('Users',{
    email: String,
    required: 'Please enter your name',
    trim: true,
    minlength: 1
});

module.exports.User = User;
