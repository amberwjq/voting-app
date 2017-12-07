var mongoose =require('mongoose');
var Schema = mongoose.Schema;
encrypt = require('../encryption');

var  userSchema = new Schema(
{
  
  firstName: {type:String, required:'{PATH} is required!'},
  lastName: {type:String, required:'{PATH} is required!'},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique:true
  },
  salt: {type:String, required:'{PATH} is required!'},
  hashed_pwd: {type:String, required:'{PATH} is required!'},
  polls:[{ type: Schema.Types.ObjectId, ref: 'Poll' }]
  
 
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
}; 
   

var User = mongoose.model('User', userSchema);

module.exports=User