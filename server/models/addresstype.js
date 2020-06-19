"use strict";
module.exports = (sequelize, DataTypes) => {
  const AddressType = sequelize.define(
    "AddressType",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  AddressType.associate = function (models) {
    // associations can be defined here
  };
  return AddressType;
};
