var express = require('express');
var path = require('path');
var stylus =require('stylus');
var logger=require('morgan');
var bodyParser = require('body-parser');
var mongoose =require('mongoose')

//an environment variable that I can determine I'm in dev mode or production mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

function compile(str,path){
 return stylus(str).set('filename',path);
}


app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine','jade');
app.use(stylus.middleware(
    {
        src: path.join(__dirname, '/public'),
        compile:compile
    }
));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 // configuration ===============================================================
//mongoose.createConnection('mongodb://localhost/test')//connect to a MongoDB database
// Connection URL
var url = 'mongodb://localhost:27017/multivision';
var mlaburl='mongodb://dummyuser:dummypassword@ds249325.mlab.com:49325/multivision'
console.log("env is " + env);
if(env === 'development')
{
    mongoose.connect(url);
}
else{
    mongoose.connect(mlaburl);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
  });

  var Schema = mongoose.Schema;
  
  // create a schema
  var messageSchema = new Schema(
    {
      message:String,
   
  });
  var Message = mongoose.model('Message', messageSchema);
  var mongoMessage='';
  var why = 'WHYWHYWHY'
  Message.findOne().exec(function(err, messageDoc) {
    
    mongoMessage = messageDoc.message;
    console.log("inside findOne mongoMessage   " + mongoMessage);
  });  
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});
console.log("mongoMessage   " + mongoMessage);
app.get('*',function(req,res){
    res.render('index', {
        mongoMessage:mongoMessage
    });
})

var port=process.env.PORT ||3030;
app.listen(port);
console.log('Listen on port' + port +'.....');