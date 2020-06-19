const router = require("express").Router();

const addressTypeController = require("../controllers/modbus/addressType.controller");
router.get("/addressType/", addressTypeController.get);
router.post("/addressType/", addressTypeController.create);
router.put("/addressType/:id", addressTypeController.update);
router.delete("/addressType/:id", addressTypeController.destroy);

const deviceController = require("../controllers/modbus/device.controller");
router.get("/device/", deviceController.get);
router.post("/device/", deviceController.create);
router.put("/device/:id", deviceController.update);
router.delete("/device/:id", deviceController.destroy);

const addressModbusController = require("../controllers/modbus/addressModbus.controller");
router.get("/addressModbus/", addressModbusController.get);
router.get("/addressModbus/:id", addressModbusController.get);
router.post("/addressModbus/", addressModbusController.create);
router.put("/addressModbus/:id", addressModbusController.update);
router.delete("/addressModbus/:id", addressModbusController.destroy);

const logsModbusController = require("../controllers/modbus/logsModbus.controller");
router.get("/logsModbus/", logsModbusController.get);
router.get("/logsModbus/:id", logsModbusController.getByDeviceId);
router.post("/logsModbus/", logsModbusController.create);
router.post("/logDate/", logsModbusController.getBydate);
router.put("/logsModbus/:id", logsModbusController.update);
router.delete("/logsModbus/one/:id", logsModbusController.destroy);
router.delete(
  "/logsModbus/by_address_id/:id",
  logsModbusController.removeLogsByAddressId
);
router.delete("/logsModbus/remove_all", logsModbusController.removeAll);
module.exports = router;
