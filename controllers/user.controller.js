const User = require("../models/User.model") 

module.exports.profile = (req, res, next) => {
    User.findById(req.session.currentUser._id) 
    .populate("posts")
    .then((user) => {
        res.render("users/profile", { user });
    })
    .catch()
    
}
