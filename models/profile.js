const mongoose = require('mongoose');

const  profileSchema = new mongoose.Schema({
  profilImg:String,
  user:String
})

module.exports = mongoose.model("Profile", profileSchema);
