const express = require("express");
const router = express.Router();
const Bikes  = require("../models/bikes");
const middleware =require("../middleware")
const multer =require("multer");
const path = require("path");
const fs= require("fs");
const fun =require("../functions/func");

const getBikes =(req,res)=>{
    var perPage = 8;
    var page = req.params.page || 1;
    Bikes.find({})
    .skip((perPage*page)-perPage)
    .limit(perPage)
    .exec()
    .then(allPosts=>{
        Bikes.count((err, count) => {
          if(err)return (err);
            res.render("bikes/index", {allPosts:allPosts, current:page, pages:Math.ceil(count/perPage)
            });
        });
    })
    .catch(err=>console.log(err))
}

const getNewBike=(req,res) => {
    res.render("bikes/new")
}

const postNewBike = (req,res) => {
  fun.upload(req,res,(err)=>{
      if(err){
            console.log(err);
      }else if(req.files===undefined){
            res.render('bikes/new', {msg:"no file selected"})
      }else{
            const { title, text }= req.body;
            const image = req.files.image[0].filename;
            const headimg = req.files.headimg[0].filename;
            const userId= req.user._id;
            const author ={
              id: req.user._id,
              username:req.user.username,
              name:req.user.name
            }
          const newPost={title,text,author,image,headimg}
          Bikes.create(newPost)
            .then(post=>{
              post.iduser =post.author.id
              post.save();
              res.redirect("/bikes/all/1");
                console.log(post);
            })
            .catch(err=>console.log(err))
          }
        });
}
const getBikesShow = (req,res) => {
   Bikes.findById(req.params.id).populate("comments")
    .exec()
    .then(showPost=>{
      res.render("bikes/show", {showPost:showPost});
      console.log(showPost)
    })
    .catch(err=>{
        res.redirect("/bikes/all/1");
    })
}
const  getBikesEdit = (req,res) => {
      Bikes.findById(req.params.id)
        .then(editPost=>{
          res.render("bikes/edit",{editPost:editPost});
        })
        .catch(err=>{
          res.redirect("/bikes/all/1")
        })
}
 const getBikeEditPhoto = (req, res) =>{
  Bikes.findById(req.params.id, function(err, editPost){
    if(err){
      res.redirect("/bikes/all/1")
    }else{
        res.render("bikes/photo",{editPost:editPost});
    }
  });
}
const postBikeEdit = (req,res) => {
  Bikes.findByIdAndUpdate(req.params.id, req.body.newPost, function(err, user){
    if(err){
      res.redirect("/bikes/all/1")
    }else if(user.image!==user.image){
        fs.unlink(user.image,function(err){
          if(err){
            console.log(err);
          }else{
            console.log("deleted");
          }
        })
    }else{
      console.log(user.image);
      res.redirect("/bikes/"+req.params.id);
    }
  });
}
const deliteBike = (req,res)=> {
  Bikes.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect("/bikes/all/1")
    }
  });
}
module.exports ={
  getBikes,
  getNewBike,
  postNewBike,
  getBikesShow,
  getBikesEdit,
  getBikeEditPhoto,
  postBikeEdit,
  deliteBike
}
