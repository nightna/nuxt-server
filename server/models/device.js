"use strict";
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "Device",
    {
      name: DataTypes.STRING,
      ip: DataTypes.STRING,
      port: DataTypes.INTEGER,
      unitId: DataTypes.INTEGER,
    },
    {}
  );
  Device.associate = function (models) {
    // associations can be defined here
  };
  return Device;
};
