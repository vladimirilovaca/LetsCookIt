const router = require("express").Router();
const { Route } = require("express");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const postController = require("../controllers/post.controller");
const likeController = require("../controllers/like.controller");
const passport = require('passport');

const GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

router.get("/", (req, res, next) => {
    res.render("home");
});

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);

router.get("/newpost", authMiddleware.isAuthenticated, postController.create);
router.post("/newpost", authMiddleware.isAuthenticated, postController.doCreate);


router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)


router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

router.get("/feed", authMiddleware.isAuthenticated, postController.list);

router.post("/feed/:postId/like", authMiddleware.isAuthenticated, likeController.doCreate);


module.exports = router;