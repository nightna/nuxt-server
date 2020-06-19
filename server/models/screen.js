'use strict';
module.exports = (sequelize, DataTypes) => {
  const screen = sequelize.define('screen', {
    name: DataTypes.STRING,
    screenId: DataTypes.STRING
  }, {});
  screen.associate = function(models) {
    // associations can be defined here
  };
  return screen;
};