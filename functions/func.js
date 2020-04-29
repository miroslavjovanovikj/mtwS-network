var multer =require("multer");
var path = require("path");
var express = require("express");
var nodemailer = require("nodemailer");

var storage =multer.diskStorage({
  destination:'./public/uploads',
  filename:function(req,files,cd){
    cd(null,Date.now()+"."+"jpeg")
  }
});
var upload =multer({
  storage:storage,
  limits:{
    filedSize:1000000
  },
}).fields([{name:"image"}, {name:"headimg"}, {name:"profilImg"}]);


module.exports ={storage,upload}
