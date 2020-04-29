var mongoose = require("mongoose");

var channelSchema = new mongoose.Schema({
  channelName:String
});

module.exports = model.mongoose("Channel",channelSchema);
