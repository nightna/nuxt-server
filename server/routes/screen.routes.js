const screenController = require("../controllers/screen/screen.controller");
const router = require("express").Router();

router.get("/", screenController.get);
router.get("/:id", screenController.get);
router.post("/", screenController.create);
router.put("/:id", screenController.update);
router.delete("/:id", screenController.destroy);

module.exports = router;
