var path = process.cwd();
var auth=require('./auth')
var encrypt = require('../encryption');
var crypto = require('crypto');
var User = require('../models/user');
var Poll = require('../models/poll');
module.exports=function(app,passport){
    function isLoggedIn (req, res, next) {
        console.log("IN LOGGEDIN USER____"+req.session.user);
		if (req.session.user) {
			return next();
		} else {
            console.log("NOT LOGGED IN");
            res.sendFile(path+'/public/views/main.html');
		}
	}

app.route('/partials/*')
.get(function(req, res) {
    console.log("I AM IN   "+req.params[0])
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
        req.session.user=null;
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
          req.session.user = user; 
          console.log('req.session.user is ' + req.session.user);  
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
app.route('/api/mypoll/*')
.get(isLoggedIn, function (req, res, next) {
    var user = req.params[0];
    console.log('in routes get api/mypoll and user to find  '+ user);
    if(req.session.user.username != user)
    {
        return res.send({success:false, reason: "unauthorized user"}); 
    }    
    User.findOne({ username : user}).exec(function(err, doc){
        Poll
            .find({ '_creator': doc._id})
            .exec(function(err, polls){
                if(err){
                    res.send(err);
                }
                return res.send({success:true, polls: polls});
                });
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
            console.log(poll._creator);
            User.findOne({ "_id" : poll._creator}).exec(function(err, user){
                if(err){
                    console.log("err!!!")
                    res.send(err);
                }         
            
            return res.send({success:true, poll: poll,user:user});
            });
  
    });
});  

 app.route('/api/createpoll')
 .post(isLoggedIn,function(req, res) {
    var pollData = req.body;
    pollData._creator=req.session.user._id;
    console.log(pollData._creator);
    console.log(pollData.subject);
  
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
  
  
    app.route('/api/poll/:id')
    .delete(isLoggedIn, function (req, res, next) {
        Poll.findById(req.params.id, function (err, poll) {
            poll.remove(function (err, poll) {
                if (err) {
                    res.send(err);
                }
                Poll
                    .find({'_creator': req.session.user._id})
                    .exec(function (err, polls) {
                        if (err) {
                            res.send(err);
                        }
                        return res.send({success:true, polls: polls});
                    });
            })
        })
    });     

 app.route('*')
.get(function (req, res) {
    res.sendFile(path + '/public/views/index.html');
});        

}