var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo-model');

var app = express();

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
app.listen(3000, () => {
    console.log("ears wide open");
});


