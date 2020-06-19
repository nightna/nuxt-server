const userController = require("../controllers/users.controller");
const router = require("express").Router();

router.get("/", userController.get);
router.get("/:id", userController.get);
router.post("/info", userController.getInfo);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
