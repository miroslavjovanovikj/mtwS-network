const express = require('express');
const router = express.Router();
const middleware =require("../middleware");
const profileCtrl = require("../controllers/profile");


router.get("/profile", middleware.isLoggedIn, profileCtrl.getProfile);
router.post("/profile",profileCtrl.postProfile );

module.exports =router;
