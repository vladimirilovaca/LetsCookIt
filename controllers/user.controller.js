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
    .populate("posts")
    .then((user) => {
        res.render("users/users-profile", { user });
    })
    .catch()
} 

module.exports.getEdit = (req, res, next) => { 
    const id = req.params.id;
  
    User.findById(id)
      .then((user) => {
        res.render("users/edit" , {user})
      })
      .catch((err) => next(err));
  
  }; 
  
  module.exports.doEdit = (req, res, next) => {
    const id = req.params.id;
    if (req.file) {
      req.body.image = req.file.path;
    }

    /*if (req.body.bio) {
      req.body.bio = req.body.bio.trim();
    }*/
  
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedUser) => {
        req.session.currentUser = updatedUser;
        res.redirect("/profile");
      })
      .catch((err) => next(err));
  };