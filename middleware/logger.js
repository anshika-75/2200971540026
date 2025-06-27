const axios = require('axios');

// Replace with the token you got from Phase 1 (Auth API)
const ACCESS_TOKEN = 'eyJhbGci0iJIUzI1NiIsInR5cCI6IkpXVCJ9';  

/**
 * Send log to AffordMed logging API
 * @param {string} stack - "backend"
 * @param {string} level - "info", "warn", "error", "fatal"
 * @param {string} pkg - "route", "handler", "service", etc.
 * @param {string} message - Descriptive log message
 */
const log = async (stack, level, pkg, message) => {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // Optional: Uncomment if you want confirmation locally
    // console.log('✅ Log sent:', response.data);
  } catch (err) {
    console.error('❌ Logging failed:', err.message);
  }
};

module.exports = log;


