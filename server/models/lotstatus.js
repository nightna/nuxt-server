'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotStatus = sequelize.define('LotStatus', {
    name: DataTypes.STRING
  }, {});
  LotStatus.associate = function(models) {
    // associations can be defined here
  };
  return LotStatus;
};