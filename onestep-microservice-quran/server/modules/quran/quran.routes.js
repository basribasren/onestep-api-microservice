const express = require('express');

const router = express.Router();
const quranController = require('./quran.controller.js');

/**
 * [GET] /api/v1/quran for get quran text
 */
router.get('/:language/sura/:sura', quranController.getBySura);

router.get('/:language/sura/:sura/aya/:aya', quranController.getByAya);

module.exports = router;
