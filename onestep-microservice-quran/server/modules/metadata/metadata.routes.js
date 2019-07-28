const express = require('express');

const router = express.Router();
const metadataController = require('./metadata.controller.js');

/**
 * [GET] /api/v1/metadata for get metadata user
 */
router.get('/sura/:numberOfSurah', metadataController.getByIndex);

router.get('/name/:tname', metadataController.getByTname);

router.get('/type/:type', metadataController.getByType);

module.exports = router;
