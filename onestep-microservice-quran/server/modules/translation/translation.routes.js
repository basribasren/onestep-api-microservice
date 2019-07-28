const express = require('express');

const router = express.Router();
const translationController = require('./translation.controller.js');

/**
 * [GET] /api/v1/translation for get translation of quran text
 */
router.get('/:language/sura/:sura', translationController.getBySura);

router.get('/:language/sura/:sura/aya/:aya', translationController.getByAya);

module.exports = router;
