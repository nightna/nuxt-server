const roleService = require("../services/roles.service");
const valid = require("../utils/validationData");
const { badReq } = require("../utils/utils");

exports.get = async (req, res) => {
  try {
    if (req.params.id) {
      const role = await roleService.get({ where: { id: req.params.id } });
      res.json({ role });
    } else {
      const roles = await roleService.get();
      res.json({ roles });
    }
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { error } = valid.createRole(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  try {
    const role = await roleService.create(data);
    res.json({ role });
  } catch (e) {
    console.log(e);
    return badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = valid.updateRole(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  try {
    const role = await roleService.update(req.params.id, data);
    if (role[0]) {
      res.json({ role: data });
    } else {
      req.status(500).json({ error: "can not update data to database." });
    }
  } catch (e) {
    console.log(e);
    return badReq(res, "can not update data to database.");
  }
};

exports.destroy = async (req, res) => {
  if (req.params.id) {
    try {
      const deleted = await roleService.destroy(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        badReq(res, "can not remove data from database.");
      }
    } catch (e) {
      console.log(e);
      return badReq(res, "can not remove data from database.");
    }
  } else {
    return badReq(res);
  }
};
