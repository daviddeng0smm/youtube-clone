const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.get('/:id/codes', gameController.getGameCodes);

// Protected routes
router.post('/', auth, gameController.createGame);
router.put('/:id', auth, gameController.updateGame);
router.delete('/:id', auth, gameController.deleteGame);
router.post('/:id/redeem', auth, gameController.redeemGameCode);

module.exports = router;