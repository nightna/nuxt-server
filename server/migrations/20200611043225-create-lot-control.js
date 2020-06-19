"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("LotControls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lotNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lineId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lotModelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lotStatusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("LotControls");
  },
};
