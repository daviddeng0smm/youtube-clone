-- Create database if it doesn't exist
-- Note: This should be run by a database administrator
-- CREATE DATABASE gamecodes_db;

-- Connect to the database
\c gamecodes_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) CHECK (platform IN ('playstation', 'steam')) NOT NULL,
    release_date DATE,
    img_url TEXT,
    genre VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create game_codes table
CREATE TABLE IF NOT EXISTS game_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    redeemed_status BOOLEAN DEFAULT FALSE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    redeemed_at TIMESTAMP NULL,
    redeemer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample Sony games
INSERT INTO games (name, platform, release_date, img_url, genre) VALUES
('The Last of Us Part II', 'playstation', '2020-06-19', 'https://image.api.playstation.com/vulcan/ap/rnd/202010/0115/b4Q1XWyaTdJbz3lOcO6oa3F8.png', 'Action/Adventure'),
('God of War', 'playstation', '2018-04-20', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF8HHoAw6QwKa6gEdrg.png', 'Action/Adventure'),
('Spider-Man: Miles Morales', 'playstation', '2020-11-12', 'https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/PRfYtTz2QctAtmKgPbcbVHg0.png', 'Action/Adventure'),
('Horizon Zero Dawn', 'playstation', '2017-02-28', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/Y0bF5RyL1tiAFtcp8pnMDM3H.png', 'Action/RPG'),
('Ghost of Tsushima', 'playstation', '2020-07-17', 'https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC4UXvAuiD6.png', 'Action/Adventure'),
('Bloodborne', 'playstation', '2015-03-24', 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/jbJvKPD8GNHJKzLvlKkiL3Ug.png', 'Action/RPG');

-- Insert sample game codes
INSERT INTO game_codes (code, game_id, owner_id) VALUES
('TLOU2-XXXX-YYYY-ZZZZ', 1, NULL),
('GOW4-AAAA-BBBB-CCCC', 2, NULL),
('MILES-DDDD-EEEE-FFFF', 3, NULL),
('HZD-GGGG-HHHH-IIII', 4, NULL),
('GOT-JJJJ-KKKK-LLLL', 5, NULL),
('BB-MMMM-NNNN-OOOO', 6, NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_codes_game_id ON game_codes(game_id);
CREATE INDEX IF NOT EXISTS idx_game_codes_owner_id ON game_codes(owner_id);
CREATE INDEX IF NOT EXISTS idx_game_codes_redeemer_id ON game_codes(redeemer_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);