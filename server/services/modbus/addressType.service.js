const DB = require("../../models/index");

module.exports = {
  get: async (options) => {
    return await DB.AddressType.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.AddressType.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.AddressType.update(
        data,
        { where: { id } },
        { transaction: t }
      );
    });
  },
  destroy: async (id) => {
    return DB.AddressType.destroy({ where: { id } });
  },
};
