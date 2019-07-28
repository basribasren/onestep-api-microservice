const metadataService = require('./metadata.service.js');

const metadataController = {
    /**
     * get metadataby numberOfSurah
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getByIndex: (req, res, next) => {
        const numberOfSurah = req.params.numberOfSurah;
        const client = req.app.get('redis.connection');
        const key = `quran:metadata:${numberOfSurah}`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result)
                return res.status(200).send({
                    message: 'get metadata success',
                    data: filter,
                });
            } else {
                metadataService.getByIndex(numberOfSurah)
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get metadata success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },
    /**
     * get metadata by Tname
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getByTname: (req, res, next) => {
        const tname = req.params.tname;
        const client = req.app.get('redis.connection');
        const key = `quran:metadata:${tname}`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result)
                return res.status(200).send({
                    message: 'get metadata success',
                    data: filter,
                });
            } else {
                metadataService.getByTname(tname)
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get metadata success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },

    /**
     * get metadata by type
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    getByType: (req, res, next) => {
        const type = req.params.type;
        const client = req.app.get('redis.connection')
        const key = `quran:metadata:${type}`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result)
                return res.status(200).send({
                    message: 'get metadata success',
                    data: filter,
                });
            } else {
                metadataService.getByType(type)
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get metadata success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },
};

module.exports = metadataController;
