const screenService = require("../../services/screen/screen.service");
const { badReq } = require("../../utils/utils");
const { createScreen, updateScreen } = require("../../utils/validationData");

exports.get = async (req, res) => {
  try {
    let screen;
    if (req.params.id) {
      screen = await screenService.get({
        where: { id: req.params.id },
      });
    } else {
      screen = await screenService.get();
    }
    res.json(screen);
  } catch (e) {
    console.log(e);
    badReq(res, "can not get data from database.");
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { error } = createScreen(data);
  if (error) {
    console.log(error.details[0].message);
    return badReq(res, error.details[0].message);
  }
  try {
    const screen = await screenService.create(data);
    res.json(screen);
  } catch (e) {
    console.log(e);
    badReq(res, "can not create data to database.");
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { error } = updateScreen(data);
  if (error) {
    return badReq(res, error.details[0].message);
  }

  if (req.params.id) {
    try {
      const screen = await screenService.update(req.params.id, data);
      if (screen[0]) {
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
      const deleted = await screenService.destroy(req.params.id);
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
