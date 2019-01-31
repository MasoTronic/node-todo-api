var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo-model');
var {User} = require('./models/User-model');
var {authenticate} = require('../server/middleware/authenticate');


var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((result)=>{
        console.log(result);
        res.send(result);
    },(err)=>{
        console.log("error");
        res.status(400).send(e);
    });

    console.log(req.body);
});

app.post('/users', (req,res) => {
    // console.log(req.body.text['email'] + 'data received ' + req.body.text['password'])
    var body = _.pick(req.body,['email','password'])
    let email = req.body.email;

    let password = req.body.password;
    console.log(JSON.stringify(req.body));
    var user = new User(body);
    
    
    user.save().then(()=>{
        console.log('saved')
       return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        console.log('error time');
        res.status(400).send("error happened " + err);
    });

    console.log(req.body);
});


app.get('/users/me', authenticate,(req, res)=>{
    console.log(req.user + 'user from authenticating urls')
    res.send(req.user);

   console.log(JSON.stringify(req.token));
});

app.get('/todos/:id', (req,res)=>{
console.log(req.params)
    if(!ObjectID.isValid(req.params.id))
    {
    return res.status(404).send();
    }
    Todo.findById(req.params.id).then((result)=>{
        if(!result)
        {
            res.send('no such user was found');
        }
        res.send({result});
    }).catch((err)=>{
        res.send('ann error occured');
    });

});
app.listen(port, () => {
    console.log(`port wide open: ${port}`);
});


