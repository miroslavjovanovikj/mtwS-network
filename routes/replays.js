const express = require("express");
const router = express.Router({mergeParams:true});
const middleware =require("../middleware");
const replaysCtrl = require('../controllers/replays');


router.get("/new",replaysCtrl.getNewReplay );
router.post("/",middleware.isLoggedIn,replaysCtrl.postReplay);
router.get("/:replay_id/edit",middleware.checkReplayOwnership,replaysCtrl.getEditReplay);
router.put("/:replay_id",middleware.checkReplayOwnership,replaysCtrl.putReplay);
router.delete("/:replay_id",middleware.checkReplayOwnership,replaysCtrl.deleteReplay);


module.exports =router;
