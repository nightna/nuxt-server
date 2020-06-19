const DB = require("../../models/index");

module.exports = {
  get: async (options) => {
    return await DB.AddressModbus.findAll(options);
  },
  create: async (data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.AddressModbus.create(data, { transaction: t });
    });
  },
  update: async (id, data) => {
    return await DB.sequelize.transaction((t) => {
      return DB.AddressModbus.update(
        data,
        { where: { id } },
        { transaction: t }
      );
    });
  },
  destroy: async (id) => {
    return DB.AddressModbus.destroy({ where: { id } });
  },
};
