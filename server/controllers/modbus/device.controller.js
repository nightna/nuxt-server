const deviceService = require("../../services/modbus/device.service");
const { badReq } = require("../../utils/utils");
const { createDevice, updateDevice } = require("../../utils/validationData");

exports.get = async (req, res) => {
  try {
    let device;
    if (req.params.id) {
      device = await deviceService.get({
        where: { device_id: req.params.id },
      });
    } else {
      device = await deviceService.get();
    }
    res.json(device);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { error } = createDevice(data);
  if (error) {
    console.log(error.details[0].message);

    return badReq(res, error.details[0].message);
  }
  try {
    const device = await deviceService.create(data);
    res.json(device);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = updateDevice(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (req.params.id) {
    try {
      const device = await deviceService.update(req.params.id, data);
      if (device[0]) {
        res.json({ data });
      } else {
        req.status(500).json({ error: "can not update data to database." });
      }
    } catch (e) {
      console.log(e);
      badReq(res, "can not update data to database.");
    }
  } else {
    badReq(res);
  }
};

exports.destroy = async (req, res) => {
  if (req.params.id) {
    try {
      const deleted = await deviceService.destroy(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        badReq(res, "can not remove data from database.");
      }
    } catch (e) {
      console.log(e);
      badReq(res, "can not remove data from database.");
    }
  } else {
    badReq(res);
  }
};
