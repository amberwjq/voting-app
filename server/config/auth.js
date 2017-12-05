var passport = require('passport');
exports.authenticate = function(req,res,next){
    var auth = passport.authenticate('local', function(err, user) {
        if(err) {return next(err);}
        if(!user) { res.send({success:false})}

          req.session.user = user; 
          console.log('req.session.user is ' + req.session.user);         
          res.send({success:true, user: user});
          
          
         
      
      })
      auth(req, res, next);


}