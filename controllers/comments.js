const Bikes   = require("../models/bikes");
const Comment = require("../models/comment");



const getNewComment = (req,res) => {
   Bikes.findById(req.params.id)
    .then(bikes=>{
       res.render("comments/new", {bikes:bikes});
    })
    .catch(err=>{
      console.log(err)
    })
}

const postComment = (req,res) =>{
    Bikes.findById(req.params.id)
    .then(bikes=>{
      Comment.create(req.body.comment)
          .then(comment =>{
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.author.name= req.user.name;
            comment.save();
            bikes.comments.push(comment);
            bikes.save();
            req.flash("success","Successfully added comment");
            res.redirect("/bikes/"+bikes._id)
          })
        })
        .catch(err=>{
          req.flash("error", "Something went wrong")
          console.log(err);
          res.redirect("/bikes/all/1");
        })
      }

const getCommentEdit =(req,res)=>{
    Comment.findById(req.params.comment_id)
     .then(foundComment=>{
         res.render("comments/edit", {bikes_id: req.params.id, comment:foundComment});
     })
     .catch(err=>{
         res.redirect("back")
     })
}

const putComment = (req,res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then(edit=>{
        res.redirect("/bikes/"+req.params.id);
    })
    .catch(err=>{
        res.redirect("back");
    })
}

const deleteComment = (req,res) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then(()=>{
      req.flash("success","Comment deleted");
      res.redirect("/bikes/"+req.params.id);
    })
    .catch(err=>{
      res.redirect("back");
    })
}
module.exports ={
  getNewComment,
  postComment,
  getCommentEdit,
  putComment,
  deleteComment
}
