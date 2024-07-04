var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController")

router.get('/', HomeController.index);
router.post('/user',UserController.create);
router.get("/user",UserController.findAll);
router.get("/user/id",UserController.findById);
router.put("/user",UserController.edit)
router.delete("/user/:id",UserController.remove)
router.post("/recoverypassword",UserController.recoverPassword);
router.post("/changePassword",UserController.changePassword);

module.exports = router;