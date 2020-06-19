const DB = require("../../models/index");

module.exports = {
  get: async (options) => {
    return await DB.userScreen.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.userScreen.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.userScreen.update(data, { where: { id } }, { transaction: t });
    });
  },
  updateByWhere: async (where, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.userScreen.update(data, { where }, { transaction: t });
    });
  },
  destroy: async (id) => {
    return DB.userScreen.destroy({ where: { id } });
  },
  destroyByOption: async (options) => {
    return DB.userScreen.destroy(options);
  },
};
