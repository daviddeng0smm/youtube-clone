const Game = require('../models/Game');
const GameCode = require('../models/GameCode');

const gameController = {
  async getAllGames(req, res) {
    try {
      const { platform } = req.query;
      let games;

      if (platform) {
        games = await Game.getByPlatform(platform);
      } else {
        games = await Game.getAll();
      }

      res.json({ games });
    } catch (error) {
      console.error('Get all games error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getGameById(req, res) {
    try {
      const { id } = req.params;
      const game = await Game.findById(id);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      res.json({ game });
    } catch (error) {
      console.error('Get game by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createGame(req, res) {
    try {
      const gameData = req.body;
      const game = await Game.create(gameData);

      res.status(201).json({
        message: 'Game created successfully',
        game
      });
    } catch (error) {
      console.error('Create game error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateGame(req, res) {
    try {
      const { id } = req.params;
      const gameData = req.body;

      const game = await Game.update(id, gameData);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      res.json({
        message: 'Game updated successfully',
        game
      });
    } catch (error) {
      console.error('Update game error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteGame(req, res) {
    try {
      const { id } = req.params;
      const game = await Game.delete(id);

      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }

      res.json({
        message: 'Game deleted successfully',
        game
      });
    } catch (error) {
      console.error('Delete game error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getGameCodes(req, res) {
    try {
      const { id } = req.params;
      const codes = await GameCode.getByGameId(id);

      res.json({ codes });
    } catch (error) {
      console.error('Get game codes error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async redeemGameCode(req, res) {
    try {
      const { id } = req.params; // game id
      const userId = req.userId;

      // Get an available code for this game
      const availableCode = await GameCode.getAvailableByGameId(id);

      if (!availableCode) {
        return res.status(404).json({ error: 'No available codes for this game' });
      }

      // Redeem the code
      const redeemedCode = await GameCode.redeemCode(availableCode.id, userId);

      if (!redeemedCode) {
        return res.status(400).json({ error: 'Failed to redeem code' });
      }

      res.json({
        message: 'Code redeemed successfully',
        code: redeemedCode.code,
        game: availableCode.game_name
      });
    } catch (error) {
      console.error('Redeem game code error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = gameController;