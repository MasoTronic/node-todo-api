const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'email in incorrect'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
    }]
});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
    console.log('in here')
    var user = this;
    console.log(JSON.stringify(user) + 'just found user');

    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access}, 'hideThis');
    console.log(token+ "toekn received")
    user.tokens.push({access, token});
    console.log(user + 'added push')

   return user.save().then((res) => {
    console.log(JSON.stringify("tsa "+ res ));
        return token;
    }).catch((err)=> {
        console.log(JSON.stringify("this error is here" + err));
        return err;
    });
}

UserSchema.statics.findByToken = function(token){



    let User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'hideThis')
        console.log(decoded);
    } catch (error) {
        return  Promise.reject('user does not exist');
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
   
}


var User = mongoose.model('UsersCollection', UserSchema);

module.exports = {User};