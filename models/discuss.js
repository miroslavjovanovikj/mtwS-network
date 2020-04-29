var mongoose = require("mongoose");

var discussSchema = new mongoose.Schema({
  title:String,
  content:String,
  forumList:String,
  created:{type:Date, default:Date.now},
  forumAuthor:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    name:String
  },
  replays:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Replay"
    }
  ]
});

module.exports = mongoose.model("Discuss",discussSchema);
