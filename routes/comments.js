const express = require("express");
const router  = express.Router({mergeParams: true});
const middleware =require("../middleware");
const commentsCtrl = require('../controllers/comments')

router.get("/new",middleware.isLoggedIn,commentsCtrl.getNewComment);
router.post("/", commentsCtrl.postComment);
router.get("/:comment_id/edit", middleware.commentOwnership, commentsCtrl.getCommentEdit);
router.put("/:comment_id", middleware.commentOwnership,commentsCtrl.putComment);
router.delete("/:comment_id", middleware.commentOwnership,commentsCtrl.deleteComment);

module.exports =router;
