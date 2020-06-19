'use strict';
module.exports = (sequelize, DataTypes) => {
  const LotMember = sequelize.define('LotMember', {
    lotControlId: DataTypes.INTEGER,
    lotMOdelId: DataTypes.INTEGER,
    cylinderNo: DataTypes.STRING,
    partNo: DataTypes.STRING,
    partName: DataTypes.STRING
  }, {});
  LotMember.associate = function(models) {
    // associations can be defined here
  };
  return LotMember;
};