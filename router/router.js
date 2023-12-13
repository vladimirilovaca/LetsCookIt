const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/user.controller")

router.get("/", (req, res, next) => {
    res.render("home");
});

router.get("/login", authController.login);
router.post("/login", authController.doLogin);
router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/logout", authController.logout);


router.get("/profile", usersController.profile);


module.exports = router;