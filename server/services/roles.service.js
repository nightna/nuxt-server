const DB = require("../models/index");

module.exports = {
  get: async (options) => {
    return await DB.Role.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.Role.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.Role.update(data, { where: { id } }, { transaction: t });
    });
  },
  destroy: async (id) => {
    return DB.Role.destroy({ where: { id } });
  },
};
