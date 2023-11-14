'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InformesDeDonaciones', {
      informe_id: {
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
      fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      contenido_informe: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      carrera_destino: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      estatus: {
        type: Sequelize.ENUM('Generado por Coordinador', 'Recibido por Administrador', 'Reclamado por Administrador', 'Aceptado'),
        allowNull: false,
      },
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
    await queryInterface.dropTable('InformesDeDonaciones');
  },
};
