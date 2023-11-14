'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdministradoresUnidadAcademica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdministradoresUnidadAcademica.init({
    admin_unidad_academica_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    unidad_academica: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdministradoresUnidadAcademica',
  });
  return AdministradoresUnidadAcademica;
};