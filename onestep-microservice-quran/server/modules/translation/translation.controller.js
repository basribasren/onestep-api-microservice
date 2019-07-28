const translationService = require('./translation.service.js');

const translationController = {
    /**
     * [description]
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getByAya: (req, res, next) => {
        const language = req.params.language.toLowerCase();
        const sura = req.params.sura;
        const aya = req.params.aya;
        const client = req.app.get('redis.connection');
        const key = `translation:${language}:sura:${sura}:aya:${aya}`;
        client.get(key, (err, result) => {
            if (result) {
                const translation = JSON.parse(result)
                return res.status(200).send({
                    message: 'get translation success',
                    data: translation,
                });
            } else {
                translationService.getByAya(language, sura, aya)
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get translation success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },
    /**
     * [description]

     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getBySura: (req, res, next) => {
        const language = req.params.language.toLowerCase();
        const sura = req.params.sura;
        const client = req.app.get('redis.connection')
        const key = `translation:${language}:sura:${sura}`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result)
                return res.status(200).send({
                    message: 'get translation success',
                    data: filter,
                });
            } else {
                translationService.getBySura(language, sura)
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get translation success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },
};

module.exports = translationController;
