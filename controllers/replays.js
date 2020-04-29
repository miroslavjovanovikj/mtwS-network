const Discuss = require("../models/discuss");
const Replay  =require("../models/replay");


const getNewReplay =(req,res)=>{
    Discuss.findById(req.params.id)
      .then(replay=>{
          res.render("replays/new",{replay:replay});
      })
      .catch(err=>{
        console.log(err)
      })
}

const postReplay = (req,res) => {
  Discuss.findById(req.params.id)
    .then(createReplay=>{
      Replay.create(req.body.content)
        .then(oneReplay=>{
                oneReplay.replayAuthor.name=req.user.name;
                oneReplay.replayAuthor.id =req.user._id;
                oneReplay.save();
                createReplay.replays.push(oneReplay);
                createReplay.save();
                res.redirect("/forum/"+req.params.id);
        })
    })
    .catch(err=>{
      console.log(err)
    })
}

const getEditReplay = (req,res) => {
  Replay.findById(req.params.replay_id).
    then(replays=>{
      res.render("replays/edit",{replay_id:req.params.id,replays:replays});
    })
    .catch(err=>{
      console.log(err)
    })
}

const putReplay = (req,res) => {
  Replay.findByIdAndUpdate(req.params.replay_id,req.body.content)
    .then(updateReplay=>{
      res.redirect("/forum/"+req.params.id);
    })
    .catch(err=>{
      console.log(err)
    })
}

const deleteReplay = (req,res) => {
  Replay.findByIdAndDelete(req.params.replay_id)
    .then(()=>{
      res.redirect("/forum/"+req.params.id);
    })
    .catch(err=>{
      res.redirect("back");
    })
}
module.exports = {
  getNewReplay,
  postReplay,
  getEditReplay,
  putReplay,
  deleteReplay
}
