module.exports.postIsLikedByUser = function (options) {
  const { userId, likes } = options.hash;

  if (userId && likes && likes.some((like) => like.user == userId)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
