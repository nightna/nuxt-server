"use strict";
module.exports = (sequelize, DataTypes) => {
  const LogModbus = sequelize.define(
    "LogModbus",
    {
      addressId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {
      updatedAt: false,
    }
  );
  LogModbus.associate = function (models) {
    LogModbus.belongsTo(models.AddressModbus, { foreignKey: "addressId" });
  };
  return LogModbus;
};
