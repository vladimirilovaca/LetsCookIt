module.exports.postIsLikedByUser = function (options) {
  const { userId, likes } = options.hash;

  if (userId && likes && likes.some((like) => like.user == userId)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

module.exports.isOwnedByUser = function (options) {
  const { currentUserId, postOwnerId } = options.hash;

  if (currentUserId.toString() === postOwnerId.toString()) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};