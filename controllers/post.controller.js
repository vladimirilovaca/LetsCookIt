const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');

module.exports.list = function (req, res, next) {
  Post.find()
    .populate("user")
    .populate("likes")
    .then((posts) => {
      res.render("recepies/feed", { posts });
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  res.render('recepies/new-post');
};

module.exports.doCreate = (req, res, next) => {
  console.log(req.body)
  if (req.file) {
    req.body.image = req.file.path
  }
  req.body.user = req.session.currentUser._id
  Post.create(req.body)
    .then(() => {
      res.redirect("/feed")
    })
    .catch(error => next(error));
}

module.exports.details = (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    .then(post => {
      if (post) {
        res.render('recepies/post', { post });
      } else {
        res.redirect('/feed');
      }
    })
    .catch(next)
}

module.exports.reCreate = (req, res, next) => {
  console.log(req.body);
  console.log(req.session.currentUser);

  const commentToCreate = req.body;
  commentToCreate.user = req.session.currentUser._id;
  commentToCreate.post = req.params.id;

  Comment.create(req.body)
    .then(post => {
      res.redirect(`/post/${req.params.id}`);
    })
    .catch(next)
} 

module.exports.getEdit = (req, res, next) => { 
  const id = req.params.id;

  Post.findById(id)
    .then((post) => {
      res.render("recepies/edit-post" , {post})
    })
    .catch((err) => next(err));

}; 

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, { new: true })
    .then((post) => {
      res.redirect(`/post/${post._id}`);
    })
    .catch((err) => next(err));
};