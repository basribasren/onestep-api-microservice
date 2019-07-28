'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuranMetadata = sequelize.define('QuranMetadata', {
    numberOfSurah: DataTypes.INTEGER,
    countOfAyat: DataTypes.INTEGER,
    name: DataTypes.STRING,
    tname: DataTypes.STRING,
    ename: DataTypes.STRING,
    type: DataTypes.STRING,
    countOfOrder: DataTypes.INTEGER,
    countOfRuku: DataTypes.INTEGER
  }, {});
  QuranMetadata.associate = function (models) {
    // associations can be defined here
    QuranMetadata.hasMany(models.QuranText, { foreignKey: 'numberOfSurah' })
  };
  return QuranMetadata;
};
