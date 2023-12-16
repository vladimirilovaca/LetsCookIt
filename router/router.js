const router = require("express").Router();
const { Route } = require("express");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const feedController = require("../controllers/feed.controller");
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


router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)


router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

router.get("/feed", authMiddleware.isAuthenticated, feedController.list);


module.exports = router;