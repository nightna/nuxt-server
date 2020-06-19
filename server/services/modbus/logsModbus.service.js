const DB = require("../../models/index");

module.exports = {
  get: async (options) => {
    return await DB.LogModbus.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.LogModbus.create(data, { transaction: t });
    });
  },
  bulkCreate: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.LogModbus.bulkCreate(
        data,
        { transaction: t },
        { silent: true }
      );
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.LogModbus.update(data, { where: { id } }, { transaction: t });
    });
  },
  destroy: async (id) => {
    return DB.LogModbus.destroy({ where: { id } });
  },
  destroyByOption: async (options) => {
    return DB.LogModbus.destroy(options);
  },
};
