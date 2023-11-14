'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoordinadoresDeCarrera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoordinadoresDeCarrera.init({
    coordinador_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    carrera: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CoordinadoresDeCarrera',
  });
  return CoordinadoresDeCarrera;
};