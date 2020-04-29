var mongoose = require("mongoose");

var replaySchema= new mongoose.Schema({
  replay:String,
  mostRecent:Number,
  replayAuthor:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String,
    name:String
  }
});
module.exports = mongoose.model("Replay", replaySchema);
