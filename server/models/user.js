var mongoose =require('mongoose');
var Schema = mongoose.Schema;
encrypt = require('../encryption');

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
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
}; 
   

var User = mongoose.model('User', userSchema);

// function createDefaultUsers() {
// User.find({}).exec(function(err, collection) {
// if(collection.length === 0) {
//   var salt, hash;
//   salt = createSalt();
//   hash = hashPwd(salt, 'joe');
//   User.create({firstName:'Joe',lastName:'Eames',username:'joe', salt: salt, hashed_pwd: hash});
//   salt = createSalt();
//   hash = hashPwd(salt, 'john');
//   User.create({firstName:'John',lastName:'Papa',username:'john', salt: salt, hashed_pwd: hash});
//   salt = createSalt();
//   hash = hashPwd(salt, 'dan');
//   User.create({firstName:'Dan',lastName:'Wahlin',username:'dan', salt: salt, hashed_pwd: hash});
// }
// })
// };

// exports.createDefaultUsers = createDefaultUsers;

module.exports=User