const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Budtotal = require("../models/budtotal")
var Profile  =require("../models/profile");
const passport = require("passport")


const getLanding =(req,res)=>{
    res.render("landing")
}
const getRegister =(req,res)=>{
   res.render("user/register")
}
const postRegister=(req,res)=>{
  new Promise((resolve, reject)=>{
    resolve(User.register(new User({
        username: req.body.username,
        name:req.body.name
      }), req.body.password))
      reject(err)
  }).then(user=>{
    passport.authenticate("local")(req, res, ()=> {
      const image ='https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png'
      req.flash("success", "Welcome" + user.username)
      Budtotal.create({total: 0,userId: user._id})
        .then(firstTotal=>{
          firstTotal.usertotal.id = req.user._id;
          firstTotal.usertotal.username = req.user.username;
          firstTotal.save();
          Profile.create({profilImg:null, user:user._id})
        })
        .catch(err=>console.log(err))
      res.redirect("/bikes/all/1");
    });
  })
  .catch(err=>{
    console.log(err)
    req.flash("error", err.message);
    return res.redirect("/register")
  })
}
const getLogin = (req, res)=> {
 res.render("user/login");
}

const postLogin =(req,res)=>{
      req.flash("error", "Logged you in!");
       res.redirect("/bikes/all/1");
}
const getL =(req, res)=> {
 req.logout();
 req.flash("error", "Logged you out!");
 res.redirect("/bikes/all/1")
}
module.exports={getRegister, getLanding,postRegister,getLogin,postLogin,getL}
