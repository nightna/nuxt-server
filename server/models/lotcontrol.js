'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotControl = sequelize.define('LotControl', {
    lotNo: DataTypes.STRING,
    lineId: DataTypes.INTEGER,
    lotModelId: DataTypes.INTEGER,
    lotStatusId: DataTypes.INTEGER
  }, {});
  LotControl.associate = function(models) {
    // associations can be defined here
  };
  return LotControl;
};