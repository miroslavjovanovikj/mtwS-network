const Bikes  = require("../models/bikes");
const Profile  =require("../models/profile");
const multer = require("multer");
const path =require("path");
const fun =require("../functions/func");


const getProfile = (req,res) => {
  const id = req.user.id;
  Bikes.find({iduser:String(id)})
   .then(find=>{
        Profile.find({user:String(id)})
          .then(trying=>{
            console.log(trying)
            res.render("profile/profile",{trying:trying,find:find})
          })
   })
   .catch(err=>{
     console.log(err)
   })
}
const postProfile =(req,res)=>{
  fun.upload(req,res,(err)=>{
      if(err){
            console.log(err);

      }else{
        Profile.create({
          profilImg:req.files.profilImg[0].filename,
          user:req.user.id,
        });
        res.redirect("/profile")
      }
    });

}
module.exports ={
  getProfile,
  postProfile
}
