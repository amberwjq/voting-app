var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var  pollSchema = new Schema(
{
  subject:String,
  options:[{
    name:String,
    voted:Number
  }]
});

   

var Poll = mongoose.model('Poll', pollSchema);


Poll.find({}).exec(function(err, collection) {
if(collection.length === 0) {

  Poll.create({
    subject:"nihao",
    options:[{
      name: "buhao",
      voted:0
    },
    {
      name: "feichang hao",
      voted:0
    }]});

 }
})

module.exports=Poll