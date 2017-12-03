var passport = require('passport');
exports.authenticate = function(req,res,next){
    var auth = passport.authenticate('local', function(err, user) {
        if(err) {return next(err);}
        if(!user) { res.send({success:false})}
        //ask Passport to login this user.XHR
        req.logIn(user, function(err) {
          if(err) {return next(err);}
          req.session.user = user; 
          console.log('req.session.user is ' + req.session.user);         
          res.send({success:true, user: user});
          
          
         
        })
      })
      auth(req, res, next);


}