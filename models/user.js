var mongoose = require("mongoose");
var passportLocalMongoose= require("passport-local-mongoose");
const image= 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png'
var userSchema = new mongoose.Schema({
  name:String,
  // profilImg:String,
  username:String,
  password:String

});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
