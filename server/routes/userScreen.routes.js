const screenController = require("../controllers/screen/userScreen.controller");
const router = require("express").Router();

router.get("/", screenController.get);
router.get("/:id", screenController.get);
router.post("/user_permission", screenController.getByUserId);
router.post("/upsert", screenController.createOrUpdate);
router.post("/", screenController.create);
router.put("/:id", screenController.update);
router.delete("/:id", screenController.destroy);

module.exports = router;
