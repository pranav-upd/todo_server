var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/test';
var schema = mongoose.Schema;
var express = require('express');
const app = express();
const cors = require('cors');
const port = 5000

app.use(cors());

mongoose.connect(mongoDB, {useNewUrlParser: true})

var todo = new mongoose.Schema({
     index: Number,
     data: String,
     isTrue : Boolean
});

var todo_model = mongoose.model('todo_model', todo);

 
app.get('/', (req, res) =>{
todo_model.find({},{"_id":0, "__v":0}, function (err, users) {
    if (err) {
        console.log(err);
    } else {
        res.send(users);
    }
    });  
});

app.get('/listener', (req, res) => {

if (req.query.del!== undefined){
    todo_model.deleteOne({index: req.query.del}).then(()=>{res.send('Successfully Deleted')})
}
else if (req.query.add_data !== undefined){
    var data_descr = req.query.add_data;
    todo_model.find({},{"_id":0, "__v":0}, function (err, users) {
    if (err) {
        console.log(err);
    } else {
      var new_index = users.length; 
          
    new_index = new_index + 1;
    var bool_value = false;
    todo1 = new todo_model({index: new_index,data:data_descr,isTrue:bool_value});
    todo1.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
    }
   });
   res.send('data added succesfully! ')
  } 
});

}

else if (req.query.bool !== undefined){
  var filter = {index: req.query.bool};
  var todo_data = todo_model.findOne(filter).then(data => {
    if (data.isTrue == false){
       todo_model.findOneAndUpdate(filter, {isTrue: true}).then(res.send('isTrue Updated!'));       
    } 
    else {
       todo_model.findOneAndUpdate(filter, {isTrue: false}).then(res.send('isTrue Updated!'));
    }
  }) 
}
else {
res.send('no args sent')
} 
})

app.listen(port, () => {
  console.log(`todo_app server listening on port ` + port);
});




