const quranService = require('./quran.service.js');
const translationService = require('../translation/translation.service.js')

/**
 * combine the quran text and translation
 * @param  {[type]} text        [description]
 * @param  {[type]} translation [description]
 * @return {[type]}             [description]
 */
const combine = (text, translation) => {
    const result = text.map(data => {
        const trans = translation.filter(a => {
            return data.numberOfAyat === a.numberOfAyat
        })
        data.translation = trans[0].text
        return data
    })
    return result
}

const quranController = {
    /**
     * get quran text by numberOfSurah and numberOfAyat
     * will return the translation too
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getByAya: (req, res, next) => {
        const ln = req.params.language;
        const sura = req.params.sura;
        const aya = req.params.aya;
        const client = req.app.get('redis.connection');
        const key = `quran:${ln}:sura:${sura}:aya:${aya}`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result)
                return res.status(200).send({
                    message: 'get quran text success',
                    data: filter,
                });
            } else {
                quranService.getByAya(sura, aya)
                    .then(quran => {
                        return translationService.getByAya(ln, sura, aya)
                            .then(translit => {
                                quran.translation = translit.text
                                return quran
                            })
                            .catch(err => { throw new Error('failed get translation') })
                    })
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get quran text success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },
    /**
     * get quran text by numberOfSurah
     * will retrun the translation too
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getBySura: (req, res, next) => {
        const ln = req.params.language;
        const sura = req.params.sura;
        const client = req.app.get('redis.connection')
        const key = `quran:${ln}:sura:${sura}`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result)
                return res.status(200).send({
                    message: 'get quran text success',
                    data: filter,
                });
            } else {
                quranService.getBySura(sura)
                    .then((quran) => {
                        return translationService.getBySura(ln, sura)
                            .then((translit) => {
                                return combine(quran, translit)
                            })
                            .catch(err => { throw new Error('get translation failed') })
                    })
                    .then(result => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get quran text success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },
};

module.exports = quranController;
