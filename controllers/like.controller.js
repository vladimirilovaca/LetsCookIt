const Like = require("../models/Like.model");

module.exports.doCreate = (req, res, next) => {
  const { postId } = req.params;
  const userId = req.session.currentUser._id;

  Like.findOne({ user: userId, post: postId })
    .then((like) => {
      if (!like) {
        return Like.create({
          user: req.session.currentUser._id,
          post: postId,
        }).then((like) => {
          res.redirect("/feed");
        });
      } else {
        return Like.findByIdAndDelete(like._id).then(() => {
          res.redirect("/feed");
        });
      }
    })
    .catch(next);
};
