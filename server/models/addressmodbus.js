"use strict";
module.exports = (sequelize, DataTypes) => {
  const AddressModbus = sequelize.define(
    "AddressModbus",
    {
      name: DataTypes.STRING,
      address: DataTypes.INTEGER,
      device_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
    },
    {}
  );
  AddressModbus.associate = function (models) {
    AddressModbus.belongsTo(models.Device, { foreignKey: "device_id" });
    AddressModbus.belongsTo(models.AddressType, { foreignKey: "type_id" });
  };
  return AddressModbus;
};
