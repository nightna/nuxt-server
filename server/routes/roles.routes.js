const roleController = require("../controllers/roles.controller");
const router = require("express").Router();

router.get("/", roleController.get);
router.get("/:id", roleController.get);
router.post("/", roleController.create);
router.put("/:id", roleController.update);
router.delete("/:id", roleController.destroy);

module.exports = router;
