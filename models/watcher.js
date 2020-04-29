var mongoose = require("mongoose");

var watcherSchema= new mongoose.Schema({

  watchers:[],
  selectedDiscuss:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Discuss"
    }
  }

});
module.exports = mongoose.model("Watchers", watcherSchema);
