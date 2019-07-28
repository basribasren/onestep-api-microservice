const models = require('../models');

const { QuranText } = models;
const attributes = [
    'id',
    'numberOfSurah',
    'numberOfAyat',
    'text'
];

const quranService = {
    /**
     * [get quran text by numberOfsurah and numberOfAyat]
     * @param  {[type]} sura [description]
     * @param  {[type]} aya  [description]
     * @return {[type]}      [description]
     */
    getByAya: (sura, aya) => {
        return QuranText.findOne({
                attributes: attributes,
                where: {
                    numberOfSurah: sura,
                    numberOfAyat: aya,
                },
            })
            .then(text => {
                return text.get({ plain: true })
            })
            .catch((err) => {
                throw new Error(`${err.name}: get quran text failed!`);
            })
    },
    /**
     * get quran text by numberOfSurah
     * @param  {[type]} sura [description]
     * @return {[type]}      [description]
     */
    getBySura: (sura) => {
        return QuranText.findAll({
                raw: true,
                attributes: attributes,
                where: { numberOfSurah: sura }
            })
            .then(text => {
                return text
            })
            .catch((err) => {
                throw new Error(`${err.name}: get quran text failed!`);
            })
    },
};

module.exports = quranService;
