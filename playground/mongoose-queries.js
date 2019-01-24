const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/Todo-model');
const {User} = require('../server/models/User-model');

var id = '6c49902f09b59308fe3911a0';

Todo.find({_id:id}).then((res)=>{
    if(res.length < 1)
    {
        return console.log("no item found")
    }
    console.log("todos",res,2);
},(err)=>{});

// var user = new User({
//     name: "Elijah",
//     email: "elija@gmail.com"
// });
// user.save().then((res)=>{console.log(res)})

if(!ObjectID.isValid(id))
{
Todo.findById(id).then((res)=>{
e.log("todos by one",res,2);
}).catch((err)=> {console.log(err)});
}else{console.log("not valid id")}

User.findById('5c49cc7a3feae50cf7702f7c').then((res) =>{
    // if(!res)
    // {
    //     return console.log("no item found");
    // }
    console.log(res);
}

   
);