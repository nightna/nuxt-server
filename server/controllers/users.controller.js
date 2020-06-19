const userService = require("../services/users.service");
const roleService = require("../services/roles.service");

const { genHashPassword, badReq, userIdFromToken } = require("../utils/utils");
const valid = require("../utils/validationData");
const db = require("../models");

const checkRole = async (data) => {
  const role = await roleService.get({ where: { id: data.roleId } });
  return role[0];
};

exports.getInfo = async (req, res) => {
  const id = userIdFromToken(req);
  try {
    const user = await userService.get({
      where: { id },
      attributes: ["id", "username", "createdAt", "updatedAt"],
      include: [
        {
          model: db.Role,
        },
      ],
    });
    res.json({ user });
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.get = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await userService.get({
        where: { id: req.params.id },
        attributes: ["id", "username", "createdAt", "updatedAt"],
        include: [
          {
            model: db.Role,
          },
        ],
      });
      res.json({ user });
    } else {
      const users = await userService.get({
        attributes: ["id", "username", "createdAt", "updatedAt"],
        include: [
          {
            model: db.Role,
          },
        ],
      });
      res.json({ users });
    }
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  let data = req.body;
  const { error } = valid.createUser(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  const role = await checkRole(data);

  if (!role) {
    return badReq(res);
  }

  const hashedPass = await genHashPassword(req.body.password);
  data.password = hashedPass;

  try {
    const newUser = await userService.create(data);
    // console.log(user.dataValues.password);
    const user = await userService.get({
      where: { id: newUser.id },
      attributes: ["id", "username", "createdAt", "updatedAt"],
      include: [
        {
          model: db.Role,
        },
      ],
    });
    res.json(user[0]);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  let data = req.body;
  const { error } = valid.updateUser(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (!req.params.id) {
    return badReq(res);
  }

  if (data.password) {
    data.password = await genHashPassword(data.password);
  }

  try {
    await userService.update(req.params.id, data);
    const user = await userService.get({
      where: { id: req.params.id },
      attributes: ["id", "username", "createdAt", "updatedAt"],
      include: [
        {
          model: db.Role,
        },
      ],
    });
    if (user) {
      res.json(user[0]);
    } else {
      req.status(500).json({ error: "can not update data to database." });
    }
  } catch (e) {
    console.log(e);
    badReq(res, "can not update data to database.");
  }
};

exports.destroy = async (req, res) => {
  if (req.params.id) {
    try {
      const deleted = await userService.destroy(req.params.id);
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
    return badReq(res);
  }
};
