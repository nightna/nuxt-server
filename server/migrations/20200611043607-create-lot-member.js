"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("LotMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lotControlId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      lotMOdelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cylinderNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      partNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      partName: {
        allowNull: false,
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("LotMembers");
  },
};
