var express     = require("express"),
    router      = express.Router(),
    mongoose    = require('mongoose'),
    msnCtrl     = require('../controllers/msn');


mongoose.connect("mongodb://127.0.0.1:27017/bike",{useNewUrlParser: true});

router.get("/chat",middleware.isLoggedIn,msnCtrl.getChat);

msnCtrl.socketOn()

module.exports = router;
