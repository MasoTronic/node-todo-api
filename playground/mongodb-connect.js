const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
    if(err)
    {
      return console.log('unable to connect to mongo');
    }
        console.log('Successfully! Connected');
        const db = client.db('TodoApp');
        db.collection('Todos').insertOne({
            test: "this is our duty",
            completed: true
        }, (err, result) => {
            if(err)
            {
                return err;
            }
        console.log('Successfully Inserted!' + JSON.stringify(result.ops,undefined,2));

        });

 

        db.collection('Todos').find({completed: true}).toArray().then(results => {
            console.log(results, undefined, 2);
        }, (err) => console.log("error"));
        // client.close();
});