var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var crypto = require('crypto');
// create a schema
var  userSchema = new Schema(
{
  
  firstName:String,
  lastName:String,
  username:String,
  salt:String,
  hashed_pwd:String
  
 
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
};    
function createSalt(){
return crypto.randomBytes(128).toString('base64');
}; 
function hashPwd (salt, pwd) {
var hmac = crypto.createHmac('sha1', salt);
return hmac.update(pwd).digest('hex');
}     
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
User.find({}).exec(function(err, collection) {
if(collection.length === 0) {
  var salt, hash;
  salt = createSalt();
  hash = hashPwd(salt, 'joe');
  User.create({firstName:'Joe',lastName:'Eames',username:'joe', salt: salt, hashed_pwd: hash});
  salt = createSalt();
  hash = hashPwd(salt, 'john');
  User.create({firstName:'John',lastName:'Papa',username:'john', salt: salt, hashed_pwd: hash});
  salt = createSalt();
  hash = hashPwd(salt, 'dan');
  User.create({firstName:'Dan',lastName:'Wahlin',username:'dan', salt: salt, hashed_pwd: hash});
}
})
};

exports.createDefaultUsers = createDefaultUsers;
// exports.User=User;