var express = require('express');

//an environment variable that I can determine I'm in dev mode or production mode
var env =process.env.NODE_ENV

var app = express();

app.set('view', __dirname + '/server/views');
app.set('view engine','jade');

app.get('*',function(req,res){
    res.render(index)
})
