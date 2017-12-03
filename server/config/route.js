var path = process.cwd();
var auth=require('./auth')
var encrypt = require('../encryption');
var crypto = require('crypto');
var User = require('../models/user');
var Poll = require('../models/poll');
module.exports=function(app,passport){
    // function isLoggedIn (req, res, next) {
	// 	if (req.session.user) {
	// 		return next();
	// 	} else {
	// 		res.sendFile(path+'/public/views/main.html');
	// 	}
	// }


app.get('/partials/*',function(req, res) {
    res.sendFile(path+'/public/views/' + req.params[0]);
    });

// app.route('/')
// .get(isLoggedIn, function (req, res) {
  
//     res.redirect('/partials/poll.html');
// });    

app.route('/login')
    // .get(function (req, res) {
    //     res.sendFile(path + '/public/views/login.html');
    // })
    .post(auth.authenticate);

app.route('/logout')
    .post(function (req, res) {
        req.logout();
       res.end();
    });
app.route('/api/signup')
    .post(function(req, res) { 
        var userData = req.body;
        userData.username = userData.username.toLowerCase();
        userData.salt = encrypt.createSalt();
        userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
        User.create(userData, function(err, user) {
          if(err) {
            console.log("err!!!")
            if(err.toString().indexOf('E11000') > -1) {
              err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
          }
          console.log("HERE!!!")
          return res.send({success:true, user: user});
            
          })

     
    });
app.get('/api/polls', function (req, res, next) {
    console.log('in routes get api/polls');
    Poll.find({})
        .exec(function(err, polls){
            if(err){
                res.send(err);
            }          
            return res.send({success:true, polls: polls});
            });


    
    });
app.get('/api/poll/*', function (req, res, next) {
    console.log('in detail routes');
    var path = req.params[0];
    console.log(path);
    Poll.findOne({'subject':path})
        .exec(function(err, poll){
            if(err){
                console.log("err!!!")
                res.send(err);
            }          
            return res.send({success:true, poll: poll});
            });




    
    });

 app.post('/api/createpoll',function(req, res) {
    var pollData = req.body;
    Poll.create(pollData, function(err, poll) {
      if(err) {
        console.log("err!!!")
        if(err.toString().indexOf('E11000') > -1) {
          err = new Error('Duplicate Username');
        }
        res.status(400);
        return res.send({reason:err.toString()});
      }
      console.log("HERE!!!")
      return res.send({success:true, polls: poll});
        
      })

 
});
app.post('/api/updatepoll',function(req,res){
    console.log("optionSelected   "+req.body.product2.name);
    var pollSelected = req.body.product;
    var optionSelected=req.body.product2.name;
    console.log("optionSelected   "+ optionSelected);
    var conditions = { "options.name": optionSelected }
    , update = { $inc: { "options.$.voted": 1 }}

  
  Poll.update(conditions, update,function (err, raw) {
    if (err) return console.log(err);
    console.log('The raw response from Mongo was ', raw);
    console.log("subject to find is "+pollSelected.subject);
    Poll.findOne({'subject':pollSelected.subject})
    .exec(function(err, poll){
        if(err){
            console.log("err!!!")
            res.send(err);
        }          
        return res.send({success:true, poll: poll});
        });

    
});

    });
  
  
     

 app.route('*')
.get(function (req, res) {
    res.sendFile(path + '/public/views/index.html');
});        

}