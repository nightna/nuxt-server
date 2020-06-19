'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotModel = sequelize.define('LotModel', {
    name: DataTypes.STRING
  }, {});
  LotModel.associate = function(models) {
    // associations can be defined here
  };
  return LotModel;
};