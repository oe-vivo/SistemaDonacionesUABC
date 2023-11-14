'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InformesDeDonaciones extends Model {
    static associate(models) {
      // define association here
    }
  }
  InformesDeDonaciones.init({
    informe_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    fecha_creacion: DataTypes.DATE,
    contenido_informe: DataTypes.TEXT,
    carrera_destino: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM('Generado por Coordinador', 'Recibido por administrador', 'Reclamado por administrador', 'Aceptado'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'InformesDeDonaciones',
    tableName: 'InformesDeDonaciones',
  });
  return InformesDeDonaciones;
};