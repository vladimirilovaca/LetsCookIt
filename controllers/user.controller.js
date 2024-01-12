const User = require("../models/User.model") 

module.exports.profile = (req, res, next) => {
    User.findById(req.session.currentUser._id) 
    .populate("posts")
    .then((user) => {
        res.render("users/profile", { user });
    })
    .catch()
    
}

module.exports.userProfile = (req, res, next) => {
    const id = req.params.id;
    User.findById(id) 
    .then((user) => {
        res.render("users/users-profile", { user });
    })
    .catch()
}