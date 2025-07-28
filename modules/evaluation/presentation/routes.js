// src/modules/evaluation/presentation/routes.js
const express = require('express');
const controller = require('./controller');

const router = express.Router();

// router.post('/submit', controller.submitEvaluation);
router.post('/submit', controller.submit);

module.exports = router;
