'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdministradoresUnidadAcademica', {
      admin_unidad_academica_id: {
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
      unidad_academica: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      // Otros atributos específicos para administradores de la unidad académica
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
    await queryInterface.dropTable('AdministradoresUnidadAcademica');
  },
};
