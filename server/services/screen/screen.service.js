const DB = require("../../models/index");

module.exports = {
  get: async (options) => {
    return await DB.screen.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.screen.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.screen.update(data, { where: { id } }, { transaction: t });
    });
  },
  destroy: async (id) => {
    return DB.screen.destroy({ where: { id } });
  },
  destroyByOption: async (options) => {
    return DB.screen.destroy(options);
  },
};
