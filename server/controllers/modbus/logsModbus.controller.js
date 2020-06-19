const logsModbusService = require("../../services/modbus/logsModbus.service");
const adddressService = require("../../services/modbus/addressModbus.service");
const db = require("../../models");
const moment = require("moment");
const { Op } = require("sequelize");
const { badReq } = require("../../utils/utils");
const {
  createLogsModbus,
  updateLogsModbus,
} = require("../../utils/validationData");

exports.getBydate = async (req, res) => {
  const data = req.body;

  const options = {
    include: [
      {
        model: db.AddressModbus,
        attributes: ["id", "name", "address"],
        include: [
          {
            model: db.Device,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
    attributes: ["id", "value", "createdAt"],
    where: {
      [Op.or]: [
        {
          createdAt: {
            [Op.between]: [data.startDate, data.dueDate],
          },
        },
      ],
      addressId: data.addressId,
    },
  };
  // console.log(options.where);

  try {
    const addressModbus = await logsModbusService.get(options);
    res.json(addressModbus);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.get = async (req, res) => {
  const options = {
    include: [
      {
        model: db.AddressModbus,
        attributes: ["id", "name", "address"],
        include: [
          {
            model: db.Device,
            attributes: ["id"],
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
    attributes: ["id", "value", "createdAt"],
  };

  try {
    const addressModbus = await logsModbusService.get(options);
    res.json(addressModbus);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.getByDeviceId = async (req, res) => {
  if (!req.params.id) {
    return badReq(res);
  }
  // console.log(req.params.id);

  try {
    console.log("before addressFind", timerStart.diff(moment()));

    let addressFind = await adddressService.get({
      where: { device_id: Number(req.params.id) },
      attributes: ["id"],
    });

    addressFind = addressFind.map((e) => e.dataValues.id);
    console.log(addressFind);

    const addressModbus = await logsModbusService.get({
      where: { addressId: addressFind },
      order: [["id", "DESC"]],
    });
    res.json(addressModbus);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const timerStart = moment();

  const data = req.body;

  const { error } = createLogsModbus(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  const addressArray = data.data.map((e) => e.address);
  const addressAll = await adddressService.get({
    where: { address: addressArray, device_id: data.device_id },
    attributes: ["id", "address"],
  });
  console.log("after addressArray", timerStart.diff(moment()));

  if (addressAll.length < 1) {
    return badReq(res);
  }

  const newData = addressAll.map((e) => {
    const t = {
      addressId: e.id,
      value: data.data.find((d) => d.address === e.address).value || 0,
    };
    if (data.createdAt) {
      t.createdAt = data.createdAt;
    }
    return t;
  });

  console.log("after newData", timerStart.diff(moment()));

  // return res.send(newData);
  try {
    const addressModbus = await logsModbusService.bulkCreate(newData);
    console.log("after addressModbus", timerStart.diff(moment()));
    res.json(addressModbus);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = updateLogsModbus(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (req.params.id) {
    try {
      const addressType = await logsModbusService.update(req.params.id, data);
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
      await logsModbusService.destroy(req.params.id);
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

exports.removeLogsByAddressId = async (req, res) => {
  if (req.params.id) {
    try {
      const deleted = await logsModbusService.destroyByOption({
        where: { addressId: req.params.id },
      });
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

exports.removeAll = async (req, res) => {
  try {
    await logsModbusService.destroyByOption({
      where: {},
      truncate: true,
    });

    res.status(204).send();
  } catch (e) {
    console.log(e);
    badReq(res, "can not remove data from database.");
  }
};
