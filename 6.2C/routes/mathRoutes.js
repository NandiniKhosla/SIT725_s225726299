/**
 * mathRoutes.js
 * This file defines REST API endpoints related to calculations.
 */

const express = require('express');
const router = express.Router();
const { add } = require('../utils/calculator');

/**
 * GET /api/add
 * Adds two numbers provided as query parameters.
 * Example: /api/add?a=5&b=3
 */
router.get('/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  // Validate input values
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({
      error: 'Invalid input. Please provide numeric values.'
    });
  }

  const result = add(a, b);
  res.status(200).json({ result });
});

module.exports = router;
