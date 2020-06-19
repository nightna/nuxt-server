const addressTypeService = require("../../services/modbus/addressType.service");
const { badReq } = require("../../utils/utils");
const {
  createAddressType,
  updateAddressType,
} = require("../../utils/validationData");

exports.get = async (req, res) => {
  try {
    let addressType;
    if (req.params.id) {
      addressType = await addressTypeService.get({
        where: { device_id: req.params.id },
      });
    } else {
      addressType = await addressTypeService.get();
    }
    res.json(addressType);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { error } = createAddressType(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }
  try {
    const addressType = await addressTypeService.create(data);
    res.json(addressType);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = updateAddressType(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (req.params.id) {
    try {
      const addressType = await addressTypeService.update(req.params.id, data);
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
      const deleted = await addressTypeService.destroy(req.params.id);
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
