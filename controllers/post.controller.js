const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');
const Recipe = require('../models/Recipe.model')

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
    .populate("recipes")
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
      res.render("recepies/edit-post", { post })
    })
    .catch((err) => next(err));

};

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    req.body.image = req.file.path;
  }

  Post.findByIdAndUpdate(id, req.body, { new: true })
    .then((post) => {
      res.redirect(`/post/${post._id}`);
    })
    .catch((err) => next(err));
};

module.exports.deletePost = (req, res, next) => {
  const id = req.params.id;

  Post.findByIdAndDelete(id)
    .then(() => {
      res.redirect(`/feed`)
    })
    .catch((err) => next(err));
}

module.exports.deleteComment = (req, res, next) => {
  const id = req.params.id;

  Comment.findByIdAndDelete(id)
    .then((comment) => {
      res.redirect(`/post/${comment.post}`)
    })
    .catch((err) => next(err));
}

module.exports.createRecipe = (req, res, next) => {
  const { postId } = req.params;
  res.render('recepies/new-recipe', { postId });
}; 

module.exports.doCreateRecipe = (req, res, next) => {
  const { postId } = req.params;

  req.body.user = req.session.currentUser;
  req.body.post = postId;

  Recipe.create(req.body)
    .then((createdRecipe) => {
      res.redirect(`/post/${createdRecipe.post}`)
    })
    .catch((err) => next(err));
};

module.exports.editRecipe = (req, res, next) => {
  const { postId } = req.params; 

  Post.findById(postId)
      .populate('recipes')
      .then ( (post) => {
        res.render('recepies/recipe-edit', { post })
      })
      .catch((err) => next(err));
}

module.exports.doEditRecipe = (req, res, next) => {
  const { postId } = req.params;

  req.body.user = req.session.currentUser;
  req.body.post = postId;

  Recipe.findOneAndUpdate({ post: postId }, req.body, { new: true, upsert: true })
      .then((updatedRecipe) => {
          res.redirect(`/post/${updatedRecipe.post._id}`);
      })
      .catch((err) => next(err));
};