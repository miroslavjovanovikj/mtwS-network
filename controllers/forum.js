
const Discuss = require("../models/discuss");
const User    = require("../models/user");
const Watchers = require("../models/watcher");
const Replay = require("../models/replay");
const nodemailer = require('nodemailer');


const postChannel = (req,res) => {
  var channel = req.body.channel;
  if(channel==="none"){
    Discuss.find({})
    .then(forumPost=>{
      res.render("forum/forum",{forumPost:forumPost});
      console.log(req.body.channel)
    })
    .catch(err=>{
      console.log(err)
    })
  }else{
    Discuss.find({forumList:channel})
    .then(forumPost=>{
      res.render("forum/forum",{forumPost:forumPost});
      console.log(req.body.channel)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

const getForum = (req,res) => {
  Discuss.find({forumList:"fix"})
    .then(forumPost=>{
      res.render("forum/forum",{forumPost:forumPost});
      console.log(req.body.channel)
    })
    .catch(err=>{
      console.log(err)
    })
}

const getForumNew = (req,res) => {
 res.render("forum/new")
}

const postForum = (req,res) => {
  const {title, content, forumList} = req.body;
  const allInfo={title, content, forumList}
    Discuss.create(allInfo)
      .then(newForum=>{
        newForum.forumAuthor.id=req.user._id;
        newForum.forumAuthor.name=req.user.name;
        newForum.save();
        res.redirect("/forum")
      })
      .catch(err=>{
        console.log(err)
      })
}

const getForumDeatils = (req,res) => {
 Discuss.findById(req.params.id).populate("replays").exec()
  .then(findDiscuss=>{
    res.render("forum/show",{findDiscuss:findDiscuss});
  })
  .catch(err=>{
      res.redirect("/forum");
  })
}
const getForumWatchers = (req,res) => {
  Discuss.findById(req.params.id).populate("replays").exec()
    .then(findDiscuss=>{
          var watchers ={watchers:req.params.id}
          const allId =  Watchers.create(watchers)
          return allId;
    })
    .then(allId=>{
          Replay.count({}, function (err, count) {
            allId.selectedDiscuss.id=req.user._id
            allId.watchers.push(allId.selectedDiscuss.id)
            allId.save();
        });
    })
    .catch(err=>{
      res.redirect("back");
    })
}
const getForumEdit =(req, res) => {
    Discuss.findById(req.params.id)
      .then(updatePost=>{
        res.render("forum/edit",{updatePost:updatePost});
      })
      .catch(err=>{
        console.log(err)
      })
}

const putForum = (err, updated) => {
  Discuss.findByIdAndUpdate(req.params.id, req.body.forum)
    .then(updated=>{
      res.redirect("/forum")
    })
    .catch(err=>{
      console.log(err)
    })
}
const deleteForum = (req,res) => {
  Discuss.findByIdAndDelete(req.params.id)
    .then(()=>{
      res.redirect("/forum")
    })
    .catc(err=>{
      console.log(err)
    })
}
module.exports = {
  postChannel,
  getForum,
  getForumNew,
  postForum,
  getForumDeatils,
  getForumWatchers,
  getForumEdit,
  putForum,
  deleteForum
}
