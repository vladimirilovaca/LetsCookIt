const router = require("express").Router();
const authController = require("../controllers/auth.controller"); 

router.get("/", (req, res, next) => {
    res.render("home");
});

router.get("/login", authController.login);
router.post("/logn", authController.doLogin);
router.get("/register", authController.register);
router.post("/register", authController.doRegister);


module.exports = router;