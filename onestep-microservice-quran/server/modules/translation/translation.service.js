const models = require('../models');

const { TranslationID, TranslationEN } = models;
const attributes = [
    'id',
    'numberOfSurah',
    'numberOfAyat',
    'text'
];

/**
 * return the translation model
 * @param  {[type]} language [description]
 * @return {[type]}          [description]
 */
const language = (language) => {
    if (language === 'id') {
        return TranslationID
    } else if (language === 'en') {
        return TranslationEN
    } else {
        throw new Error('The language is not support')
    }
}

const translationService = {
    /**
     * get translation by numberOfSurah and numberOfAyat
     * @param  {[type]} ln   [description]
     * @param  {[type]} sura [description]
     * @param  {[type]} aya  [description]
     * @return {[type]}      [description]
     */
    getByAya: (ln, sura, aya) => {
        const TRANSLATION = language(ln)
        return TRANSLATION.findOne({
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
                throw new Error(`${err.name}: get translation failed!`);
            })
    },
    /**
     * get translation by numberOfSurah
     * @param  {[type]} ln   [description]
     * @param  {[type]} sura [description]
     * @return {[type]}      [description]
     */
    getBySura: (ln, sura) => {
        const TRANSLATION = language(ln)
        return TRANSLATION.findAll({
                raw: true,
                attributes: attributes,
                where: { numberOfSurah: sura },
            })
            .then(text => {
                return text
            })
            .catch((err) => {
                throw new Error(`${err.name}: get translation failed!`);
            })
    },
};

module.exports = translationService;
