const GameCode = require('../models/GameCode');

const gameCodeController = {
  async getAllCodes(req, res) {
    try {
      const codes = await GameCode.getAll();
      res.json({ codes });
    } catch (error) {
      console.error('Get all codes error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getCodeById(req, res) {
    try {
      const { id } = req.params;
      const code = await GameCode.findById(id);

      if (!code) {
        return res.status(404).json({ error: 'Code not found' });
      }

      res.json({ code });
    } catch (error) {
      console.error('Get code by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createCode(req, res) {
    try {
      const codeData = req.body;
      const code = await GameCode.create(codeData);

      res.status(201).json({
        message: 'Code created successfully',
        code
      });
    } catch (error) {
      console.error('Create code error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async generateBulkCodes(req, res) {
    try {
      const { gameId, count, prefix } = req.body;

      if (!gameId || !count) {
        return res.status(400).json({ error: 'Game ID and count are required' });
      }

      const codes = await GameCode.generateBulkCodes(gameId, count, prefix);

      res.status(201).json({
        message: `${codes.length} codes generated successfully`,
        codes
      });
    } catch (error) {
      console.error('Generate bulk codes error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getUserRedeemedCodes(req, res) {
    try {
      const userId = req.userId;
      const codes = await GameCode.getByUserId(userId);

      res.json({ codes });
    } catch (error) {
      console.error('Get user redeemed codes error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteCode(req, res) {
    try {
      const { id } = req.params;
      const code = await GameCode.delete(id);

      if (!code) {
        return res.status(404).json({ error: 'Code not found' });
      }

      res.json({
        message: 'Code deleted successfully',
        code
      });
    } catch (error) {
      console.error('Delete code error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = gameCodeController;