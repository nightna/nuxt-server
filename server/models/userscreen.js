"use strict";
module.exports = (sequelize, DataTypes) => {
  const userScreen = sequelize.define(
    "userScreen",
    {
      userId: DataTypes.INTEGER,
      screenId: DataTypes.INTEGER,
      flag: DataTypes.BOOLEAN,
    },
    {}
  );
  userScreen.associate = function (models) {
    userScreen.belongsTo(models.User, { foreignKey: "userId" });
    userScreen.belongsTo(models.screen, { foreignKey: "screenId" });
  };
  return userScreen;
};
