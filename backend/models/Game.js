const pool = require('../config/database');

class Game {
  static async create(gameData) {
    const { name, platform, release_date, img_url, genre } = gameData;
    
    const query = `
      INSERT INTO games (name, platform, release_date, img_url, genre)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [name, platform, release_date, img_url, genre];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = `
      SELECT g.*, 
             COUNT(gc.id) as total_codes,
             COUNT(CASE WHEN gc.redeemed_status = false THEN 1 END) as available_codes
      FROM games g
      LEFT JOIN game_codes gc ON g.id = gc.game_id
      GROUP BY g.id
      ORDER BY g.release_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT g.*, 
             COUNT(gc.id) as total_codes,
             COUNT(CASE WHEN gc.redeemed_status = false THEN 1 END) as available_codes
      FROM games g
      LEFT JOIN game_codes gc ON g.id = gc.game_id
      WHERE g.id = $1
      GROUP BY g.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getByPlatform(platform) {
    const query = `
      SELECT g.*, 
             COUNT(gc.id) as total_codes,
             COUNT(CASE WHEN gc.redeemed_status = false THEN 1 END) as available_codes
      FROM games g
      LEFT JOIN game_codes gc ON g.id = gc.game_id
      WHERE g.platform = $1
      GROUP BY g.id
      ORDER BY g.release_date DESC
    `;
    const result = await pool.query(query, [platform]);
    return result.rows;
  }

  static async update(id, gameData) {
    const { name, platform, release_date, img_url, genre } = gameData;
    
    const query = `
      UPDATE games 
      SET name = $1, platform = $2, release_date = $3, img_url = $4, genre = $5
      WHERE id = $6
      RETURNING *
    `;
    
    const values = [name, platform, release_date, img_url, genre, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM games WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Game;