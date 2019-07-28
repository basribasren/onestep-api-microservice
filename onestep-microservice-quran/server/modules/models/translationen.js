'use strict';
module.exports = (sequelize, DataTypes) => {
  const TranslationEN = sequelize.define('TranslationEN', {
    numberOfSurah: DataTypes.INTEGER,
    numberOfAyat: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {});
  TranslationEN.associate = function(models) {
    // associations can be defined here
  };
  return TranslationEN;
};