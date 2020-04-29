const express = require("express");
const router = express.Router();
const pass = require("passport")

const indexCtrl =require('../controllers/index');
const successRedirect ="/bikes/all/1";
const failureRedirect="/login";
const l = "local";

router.get("/", indexCtrl.getLanding);
router.get("/register",indexCtrl.getRegister);
router.post("/register",indexCtrl.postRegister);
router.get("/login",indexCtrl.getLogin);
router.post("/login",pass.authenticate(l,{successRedirect,failureRedirect
  }), indexCtrl.postLogin);
router.get("/logout",indexCtrl.getL);

module.exports = router;
