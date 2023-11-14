'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donaciones.init({
    donacion_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    fecha_donacion: DataTypes.DATE,
    comprobante: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donaciones',
  });
  return Donaciones;
};