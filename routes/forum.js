const express = require("express");
const router = express.Router();
const middleware =require("../middleware");
const forumCtrl = require('../controllers/forum');


router.post("/channel", forumCtrl.postChannel)
router.get("/forum", forumCtrl.getForum);
router.get("/forum/new",forumCtrl.getForumNew)
router.post("/forum", middleware.isLoggedIn,forumCtrl.postForum);
router.get("/forum/:id",forumCtrl.getForumDeatils);
router.get("/forum/:id/watchers",forumCtrl.getForumWatchers);
router.get("/forum/:id/edit",middleware.checkForumOwnership, forumCtrl.getForumEdit);
router.put("/forum/:id",middleware.checkForumOwnership,forumCtrl.putForum);
router.delete("/forum/:id",middleware.checkForumOwnership,forumCtrl.deleteForum)

module.exports = router;
