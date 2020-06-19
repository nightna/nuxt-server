const userScreenService = require("../../services/screen/userScreen.service");
const screenService = require("../../services/screen/screen.service");
const db = require("../../models");
const { badReq } = require("../../utils/utils");
const {
  createUserScreen,
  updateUserScreen,
} = require("../../utils/validationData");

const getUserScreenJointed = async (where) => {
  const options = {
    include: [
      {
        model: db.User,
        attributes: ["id", "username"],
      },
      {
        model: db.screen,
        attributes: ["id", "name"],
      },
    ],
  };
  if (where) {
    options.where = where;
  }
  return await userScreenService.get(options);
};

exports.getByUserId = async (req, res) => {
  try {
    if (req.body.id) {
      userScreen = await getUserScreenJointed({ userId: req.body.id });
      res.json(userScreen);
    } else {
      badReq(res);
    }
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.get = async (req, res) => {
  try {
    let userScreen;
    if (req.params.id) {
      userScreen = await getUserScreenJointed({ id: req.params.id });
    } else {
      userScreen = await getUserScreenJointed();
    }
    res.json(userScreen);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { error } = createUserScreen(data);
  if (error) {
    console.log(error.details[0].message);
    return badReq(res, error.details[0].message);
  }
  try {
    const userScreen = await userScreenService.create(data);
    const get = await getUserScreenJointed({ id: userScreen.id });
    res.json(get);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

const upsert = async (data) => {
  await data.screenPermission.forEach(async (s) => {
    const result = await getUserScreenJointed({
      userId: data.userId,
      screenId: s.id,
    });
    if (result.length > 0) {
      await userScreenService.updateByWhere(
        { userId: data.userId, screenId: s.id },
        { userId: data.userId, screenId: s.id, flag: s.flag }
      );
    } else {
      await userScreenService.create({
        userId: data.userId,
        screenId: s.id,
        flag: s.flag,
      });
    }
  });
};

exports.createOrUpdate = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    await upsert(data);
    res.send(true);
  } catch (err) {
    console.log(err);
    badReq(res, "can not create or update to database");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = updateUserScreen(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (req.params.id) {
    try {
      const userScreen = await userScreenService.update(req.params.id, data);
      if (userScreen[0]) {
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
      const deleted = await userScreenService.destroy(req.params.id);
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
