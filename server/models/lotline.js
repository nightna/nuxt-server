'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotLine = sequelize.define('LotLine', {
    name: DataTypes.STRING
  }, {});
  LotLine.associate = function(models) {
    // associations can be defined here
  };
  return LotLine;
};