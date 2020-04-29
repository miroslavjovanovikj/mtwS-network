var express = require("express");
var router = express.Router();
var middleware =require("../middleware")
const bikesCtrl= require('../controllers/bikes')


router.get("/all/:page",bikesCtrl.getBikes);
router.get("/new", middleware.isLoggedIn,bikesCtrl.getNewBike);
router.post("/", middleware.isLoggedIn,bikesCtrl.postNewBike);
router.get("/:id",bikesCtrl.getBikesShow);
router.get("/:id/edit", middleware.checkOwnership,bikesCtrl.getBikesEdit);//da se vidi
router.get("/:id/edit/photo",middleware.checkOwnership, bikesCtrl.getBikeEditPhoto);
router.put("/:id", middleware.checkOwnership,bikesCtrl.postBikeEdit);
router.delete("/:id", middleware.checkOwnership,bikesCtrl.deliteBike);

module.exports =router;
