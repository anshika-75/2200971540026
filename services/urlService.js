const { v4: uuidv4 } = require('uuid');
const log = require('../middleware/logger');
const urlDB = {};  // mock in-memory DB
const clickStats = {};

const createShortURL = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url) {
    log('backend', 'error', 'handler', 'URL missing in request');
    return res.status(400).json({ error: 'URL is required' });
  }

  const code = shortcode || uuidv4().slice(0, 6);
  const expiry = Date.now() + validity * 60 * 1000;

  urlDB[code] = { original: url, expiry };
  clickStats[code] = [];

  log('backend', 'info', 'route', `Short URL created: ${code}`);
  return res.status(201).json({ shortLink: `http://localhost:3000/${code}`, expiry });
};

const getShortURLStats = (req, res) => {
  const code = req.params.shortcode;

  if (!urlDB[code]) {
    log('backend', 'error', 'handler', 'Shortcode not found');
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  return res.status(200).json({
    original: urlDB[code].original,
    expiry: urlDB[code].expiry,
    clicks: clickStats[code]
  });
};

const redirectToLongURL = (req, res) => {
  const code = req.params.shortcode;

  if (!urlDB[code]) {
    log('backend', 'error', 'handler', 'Redirect shortcode not found');
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (Date.now() > urlDB[code].expiry) {
    log('backend', 'warn', 'handler', 'Link expired');
    return res.status(410).json({ error: 'Short URL expired' });
  }

  // Track stats
  clickStats[code].push({
    timestamp: new Date().toISOString(),
    referer: req.headers.referer || 'Direct'
  });

  return res.redirect(urlDB[code].original);
};

module.exports = { createShortURL, getShortURLStats, redirectToLongURL };

