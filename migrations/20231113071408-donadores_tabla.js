'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Donadores', {
      donador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'user_id',
        },
      },
      rfc: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      constancia_fiscal: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      // Otros atributos específicos para donadores
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Donadores');
  },
};
