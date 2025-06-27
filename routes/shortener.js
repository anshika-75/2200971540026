const express = require('express');
const router = express.Router();
const {
  createShortURL,
  getShortURLStats,
  redirectToLongURL
} = require('../services/urlService');

// POST /shorturls
router.post('/shorturls', createShortURL);

// GET /shorturls/:shortcode
router.get('/shorturls/:shortcode', getShortURLStats);

// GET /:shortcode
router.get('/:shortcode', redirectToLongURL);

module.exports = router;