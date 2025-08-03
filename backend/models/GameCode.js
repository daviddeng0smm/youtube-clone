const pool = require('../config/database');

class GameCode {
  static async create(codeData) {
    const { code, game_id, owner_id } = codeData;
    
    const query = `
      INSERT INTO game_codes (code, game_id, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const values = [code, game_id, owner_id || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = `
      SELECT gc.*, 
             g.name as game_name, 
             g.platform,
             u1.name as owner_name,
             u2.name as redeemer_name
      FROM game_codes gc
      LEFT JOIN games g ON gc.game_id = g.id
      LEFT JOIN users u1 ON gc.owner_id = u1.id
      LEFT JOIN users u2 ON gc.redeemer_id = u2.id
      ORDER BY gc.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT gc.*, 
             g.name as game_name, 
             g.platform,
             u1.name as owner_name,
             u2.name as redeemer_name
      FROM game_codes gc
      LEFT JOIN games g ON gc.game_id = g.id
      LEFT JOIN users u1 ON gc.owner_id = u1.id
      LEFT JOIN users u2 ON gc.redeemer_id = u2.id
      WHERE gc.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getByGameId(gameId) {
    const query = `
      SELECT gc.*, 
             g.name as game_name, 
             g.platform,
             u1.name as owner_name,
             u2.name as redeemer_name
      FROM game_codes gc
      LEFT JOIN games g ON gc.game_id = g.id
      LEFT JOIN users u1 ON gc.owner_id = u1.id
      LEFT JOIN users u2 ON gc.redeemer_id = u2.id
      WHERE gc.game_id = $1
      ORDER BY gc.redeemed_status ASC, gc.created_at DESC
    `;
    const result = await pool.query(query, [gameId]);
    return result.rows;
  }

  static async getAvailableByGameId(gameId) {
    const query = `
      SELECT gc.*, g.name as game_name, g.platform
      FROM game_codes gc
      LEFT JOIN games g ON gc.game_id = g.id
      WHERE gc.game_id = $1 AND gc.redeemed_status = false
      ORDER BY gc.created_at ASC
      LIMIT 1
    `;
    const result = await pool.query(query, [gameId]);
    return result.rows[0];
  }

  static async redeemCode(codeId, redeemerId) {
    const query = `
      UPDATE game_codes 
      SET redeemed_status = true, 
          redeemer_id = $1, 
          redeemed_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND redeemed_status = false
      RETURNING *
    `;
    const result = await pool.query(query, [redeemerId, codeId]);
    return result.rows[0];
  }

  static async getByUserId(userId) {
    const query = `
      SELECT gc.*, 
             g.name as game_name, 
             g.platform, 
             g.img_url
      FROM game_codes gc
      LEFT JOIN games g ON gc.game_id = g.id
      WHERE gc.redeemer_id = $1
      ORDER BY gc.redeemed_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM game_codes WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async generateBulkCodes(gameId, count, prefix = 'GAME') {
    const codes = [];
    for (let i = 0; i < count; i++) {
      const randomCode = `${prefix}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      codes.push(randomCode);
    }

    const query = `
      INSERT INTO game_codes (code, game_id)
      SELECT unnest($1::text[]), $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [codes, gameId]);
    return result.rows;
  }
}

module.exports = GameCode;