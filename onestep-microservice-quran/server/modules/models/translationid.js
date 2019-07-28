'use strict';
module.exports = (sequelize, DataTypes) => {
  const TranslationID = sequelize.define('TranslationID', {
    numberOfSurah: DataTypes.INTEGER,
    numberOfAyat: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {});
  TranslationID.associate = function(models) {
    // associations can be defined here
  };
  return TranslationID;
};