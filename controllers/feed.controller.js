const Post = require('../models/Post.model'); 

module.exports.list = function(req, res, next) {
    Post.find()
        .populate('user')
        .then(posts => res.render("recepies/feed", { posts }))
        .catch(error => next(error));
}