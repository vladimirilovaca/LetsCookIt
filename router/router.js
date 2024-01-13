const router = require("express").Router();
const { Route } = require("express");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const postController = require("../controllers/post.controller");
const likeController = require("../controllers/like.controller");
const passport = require('passport');
const upload = require("../config/cloudinary.config")

const GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

router.get("/", (req, res, next) => {
    res.render("home");
});
//Login
router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);
//Post
router.get("/newpost", authMiddleware.isAuthenticated, postController.create);
router.post("/newpost", authMiddleware.isAuthenticated, upload.single('image'), postController.doCreate);
router.get("/post/:id", authMiddleware.isAuthenticated, postController.details);
router.post("/post/:id", authMiddleware.isAuthenticated, postController.reCreate);
router.get("/edit/:id", authMiddleware.isAuthenticated, postController.getEdit);
router.post("/edit/:id", authMiddleware.isAuthenticated, upload.single('image'), postController.doEdit);
//Recipe
router.get("/recipe/:postId", authMiddleware.isAuthenticated, postController.createRecipe);
router.post("/recipe/:postId", authMiddleware.isAuthenticated, postController.doCreateRecipe);
router.get("/recipe/edit/:postId", authMiddleware.isAuthenticated, postController.editRecipe);
router.post("/recipe/edit/:postId", authMiddleware.isAuthenticated, postController.doEditRecipe);
//Delte
router.get("/post/:id/postDelete", authMiddleware.isAuthenticated, postController.deletePost);
router.get("/post/:id/commentDelete", authMiddleware.isAuthenticated, postController.deleteComment);

router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)

//profile
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);
router.get("/profile/:id", authMiddleware.isAuthenticated, usersController.userProfile);
router.get("/profile/edit/:id", authMiddleware.isAuthenticated, usersController.getEdit);
router.post("/profile/edit/:id", authMiddleware.isAuthenticated, upload.single('image'), usersController.doEdit);

router.get("/feed", authMiddleware.isAuthenticated, postController.list);

router.post("/feed/:postId/like", authMiddleware.isAuthenticated, likeController.doCreate);


module.exports = router;