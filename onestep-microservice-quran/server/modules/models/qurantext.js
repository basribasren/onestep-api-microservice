'use strict';
module.exports = (sequelize, DataTypes) => {
	const QuranText = sequelize.define('QuranText', {
		numberOfSurah: DataTypes.INTEGER,
		numberOfAyat: DataTypes.INTEGER,
		text: DataTypes.TEXT
	}, {});
	QuranText.associate = function (models) {
		// associations can be defined here
		QuranText.belongsTo(models.QuranMetadata, { as: 'metadata', foreignKey: 'numberOfSurah' })
	};
	return QuranText;
};
