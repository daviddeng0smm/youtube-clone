const express = require('express');
const router = express.Router();
const gameCodeController = require('../controllers/gameCodeController');
const auth = require('../middleware/auth');

// Protected routes (all game code operations require authentication)
router.get('/', auth, gameCodeController.getAllCodes);
router.get('/my-codes', auth, gameCodeController.getUserRedeemedCodes);
router.get('/:id', auth, gameCodeController.getCodeById);
router.post('/', auth, gameCodeController.createCode);
router.post('/bulk', auth, gameCodeController.generateBulkCodes);
router.delete('/:id', auth, gameCodeController.deleteCode);

module.exports = router;