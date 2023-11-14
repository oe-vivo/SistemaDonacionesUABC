'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donadores.init({
    donador_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rfc: DataTypes.STRING,
    constancia_fiscal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donadores',
  });
  return Donadores;
};