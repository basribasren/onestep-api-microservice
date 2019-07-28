const models = require('../models');

const { QuranMetadata, QuranText } = models;
const attributes = [
    'numberOfSurah',
    'countOfAyat',
    'name',
    'tname',
    'ename',
    'type',
    'countOfOrder',
    'countOfRuku'
];

const metadataService = {
    /**
     * get metadata by numberOfSurah
     * include arabic text
     * @type {[type]}
     */
    getByIndex: (numberOfSurah) => {
        return QuranMetadata.findOne({
                attributes: attributes,
                where: {
                    numberOfSurah: numberOfSurah,
                },
                include: [{ model: QuranText, attributes: ['numberOfAyat', 'text'] }]
            })
            .then(metadata => {
                return metadata.get({ plain: true })
            })
            .catch((err) => {
                throw new Error(`${err.name}: get metadata failed! ${err.message}`);
            })
    },
    /**
     * get metadata by Tname
     * include arabic text
     * @param  {[type]} tname [description]
     * @return {[type]}       [description]
     */
    getByTname: (tname) => {
        return QuranMetadata.findOne({
                attributes: attributes,
                where: {
                    tname: tname,
                },
                include: [{ model: QuranText, attributes: ['numberOfAyat', 'text'] }]
            })
            .then(metadata => {
                return metadata.get({ plain: true })
            })
            .catch((err) => {
                throw new Error(`${err.name}: get metadata failed! ${err.message}`);
            })

    },
    /**
     * get metadata by type ['meccan', 'medinan']
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    getByType: (type) => {
        return QuranMetadata.findAll({
                attributes: attributes,
                where: { type: type },
            })
            .then(metadata => {
                return metadata
            })
            .catch((err) => {
                throw new Error(`${err.name}: get metadata failed! ${err.message}`);
            })
    },
};

module.exports = metadataService;
