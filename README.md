# Game Code Dispenser

A full-stack web application for dispensing game codes for Sony published games. Built with PostgreSQL, Express, React, and Node.js (PERN stack).

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Game Catalog**: Browse Sony published games with beautiful card-based UI
- **Code Redemption**: Redeem available game codes for registered users
- **Platform Filtering**: Filter games by PlayStation or Steam platform
- **Real-time Updates**: Available code counts update in real-time
- **Responsive Design**: Modern, mobile-friendly interface

## Tech Stack

- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React, TypeScript
- **Authentication**: JWT tokens, bcrypt password hashing
- **Architecture**: MVC (Model-View-Controller) pattern

## Database Schema

### Users Table
- `id` (Primary Key)
- `name`
- `email` (Unique)
- `password` (Hashed)
- `created_at`

### Games Table
- `id` (Primary Key)
- `name`
- `platform` (playstation/steam)
- `release_date`
- `img_url`
- `genre`
- `created_at`

### Game Codes Table
- `id` (Primary Key)
- `code` (Unique)
- `redeemed_status`
- `game_id` (Foreign Key)
- `owner_id` (Foreign Key)
- `redeemed_at`
- `redeemer_id` (Foreign Key)
- `created_at`

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd game-code-dispenser
```

### 2. Database Setup

1. Create a PostgreSQL database named `gamecodes_db`
2. Run the initialization script:

```bash
psql -U postgres -d gamecodes_db -f backend/config/init-db.sql
```

### 3. Environment Configuration

The backend is already configured with the following environment variables in `backend/.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Sellercentral1!
DB_NAME=gamecodes_db
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 5. Start the Application

From the root directory:

```bash
# Start both backend and frontend concurrently
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Games
- `GET /api/games` - Get all games (with optional platform filter)
- `GET /api/games/:id` - Get game by ID
- `POST /api/games` - Create new game (protected)
- `PUT /api/games/:id` - Update game (protected)
- `DELETE /api/games/:id` - Delete game (protected)
- `POST /api/games/:id/redeem` - Redeem game code (protected)

### Game Codes
- `GET /api/codes` - Get all codes (protected)
- `GET /api/codes/my-codes` - Get user's redeemed codes (protected)
- `POST /api/codes` - Create new code (protected)
- `POST /api/codes/bulk` - Generate bulk codes (protected)
- `DELETE /api/codes/:id` - Delete code (protected)

## Sample Data

The application comes pre-loaded with popular Sony games:
- The Last of Us Part II
- God of War
- Spider-Man: Miles Morales
- Horizon Zero Dawn
- Ghost of Tsushima
- Bloodborne

Each game has sample codes available for redemption.

## Usage

1. **Browse Games**: View all available games on the homepage
2. **Filter by Platform**: Use the platform filter buttons to show only PlayStation or Steam games
3. **Register/Login**: Click the "Login / Register" button to create an account
4. **Redeem Codes**: Once logged in, click "Redeem Code" on any game card to get a code
5. **View Redeemed Codes**: Access your redeemed codes through the API endpoint

## Development

### Project Structure

```
game-code-dispenser/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Authentication middleware
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── components/ # React components
│       ├── pages/      # Page components
│       ├── services/   # API services
│       ├── context/    # React context
│       ├── types/      # TypeScript types
│       └── App.tsx     # Main App component
└── package.json        # Root package.json
```

### Adding New Games

To add new games, you can either:
1. Use the API endpoints (requires authentication)
2. Insert directly into the database
3. Extend the `init-db.sql` file

### Generating Game Codes

Use the bulk code generation endpoint:

```bash
POST /api/codes/bulk
{
  "gameId": 1,
  "count": 10,
  "prefix": "GAME"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.