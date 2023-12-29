const Post = require("../models/Post.model");

module.exports.list = function (req, res, next) {
  Post.find()
    .populate("user")
    .populate("likes")
    .then((posts) => {
      res.render("recepies/feed", { posts });
    })
    .catch((error) => next(error));
};
