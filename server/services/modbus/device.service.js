const DB = require("../../models/index");

module.exports = {
  get: async (options) => {
    return await DB.Device.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.Device.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.Device.update(data, { where: { id } }, { transaction: t });
    });
  },
  destroy: async (id) => {
    return DB.Device.destroy({ where: { id } });
  },
};
