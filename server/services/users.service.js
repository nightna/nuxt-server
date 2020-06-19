const DB = require("../models/index");

module.exports = {
  get: async (options) => {
    return await DB.User.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.User.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.User.update(data, { where: { id } }, { transaction: t });
    });
  },
  destroy: async (id) => {
    return DB.User.destroy({ where: { id } });
  },
  destroyByOption: async (options) => {
    return DB.User.destroy(options);
  },
};
