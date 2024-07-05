var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth")

router.get('/', HomeController.index);
router.post('/user',UserController.create);
router.get("/user",AdminAuth,UserController.findAll);
router.get("/user/id",UserController.findById);
router.put("/user",AdminAuth,UserController.edit)
router.delete("/user/:id",AdminAuth,UserController.remove)
router.post("/recoverypassword",UserController.recoverPassword);
router.post("/changePassword",UserController.changePassword);
router.post("/login",UserController.login);

module.exports = router;