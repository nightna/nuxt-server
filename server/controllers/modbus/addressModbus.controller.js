const addressModbusService = require("../../services/modbus/addressModbus.service");
const { badReq } = require("../../utils/utils");
const db = require("../../models");
const {
  createAddressModbus,
  updateAddressModbus,
} = require("../../utils/validationData");

exports.get = async (req, res) => {
  try {
    let addressModbus;
    if (req.params.id) {
      addressModbus = await addressModbusService.get({
        where: { device_id: req.params.id },
        include: [
          {
            model: db.Device,
          },
          {
            model: db.AddressType,
          },
        ],
      });
    } else {
      addressModbus = await addressModbusService.get({
        include: [
          {
            model: db.Device,
          },
          {
            model: db.AddressType,
          },
        ],
      });
    }
    res.json(addressModbus);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { error } = createAddressModbus(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }
  try {
    const addressModbus = await addressModbusService.create(data);
    const findAddress = await addressModbusService.get({
      where: { id: addressModbus.id },
      include: [
        {
          model: db.Device,
        },
        {
          model: db.AddressType,
        },
      ],
    });
    res.json(findAddress);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = updateAddressModbus(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (req.params.id) {
    try {
      const addressType = await addressModbusService.update(
        req.params.id,
        data
      );
      if (addressType[0]) {
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
      const deleted = await addressModbusService.destroy(req.params.id);
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
