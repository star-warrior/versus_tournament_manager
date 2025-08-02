# Versus - Tournament Management System

A modern web application for creating and managing racket sport tournaments with Google OAuth authentication, player management, and automated participant tracking.

## 🏸 About

Versus is a full-stack tournament management system designed specifically for racket sports enthusiasts. Users can create, manage, and participate in tournaments for various racket sports including badminton, tennis, table tennis, and more. The system features automated participant counting, player registration, and comprehensive tournament management capabilities.

## ✨ Features

### Core Features

- **Google OAuth Authentication** - Secure login using Google accounts
- **Tournament Creation & Management** - Create and manage tournaments with comprehensive details
- **Player Registration System** - Add players to tournaments with contact information and seeding
- **Multi-Sport Support** - Support for various racket sports:
  - Badminton
  - Tennis
  - Table Tennis
  - Squash
  - Racquetball
  - Pickleball
  - Padel
  - Beach Tennis
- **Advanced Search & Filtering** - Filter tournaments by city, state, and sport type
- **Image Upload** - Upload tournament banners and player profile pictures
- **User Dashboard** - View and manage your created tournaments
- **Session Management** - Persistent login sessions with secure cookies
- **Automated Participant Counting** - Real-time participant count updates via database triggers

### Technical Features

- **Responsive Design** - Built with Tailwind CSS for mobile-first design
- **Real-time Updates** - Dynamic content loading and updates
- **File Upload Support** - Image handling with preview functionality
- **Cross-Origin Support** - Proper CORS configuration for frontend-backend communication
- **Database Triggers** - Automated participant count management
- **Data Validation** - Input sanitization and validation
- **Error Handling** - Comprehensive error handling and user feedback

## 🎯 Project Goals

1. **Simplify Tournament Organization** - Provide an easy-to-use platform for organizing racket sport tournaments
2. **Community Building** - Connect players and tournament organizers in one platform
3. **Modern User Experience** - Deliver a fast, responsive, and intuitive interface
4. **Scalable Architecture** - Built with modern technologies for future expansion
5. **Automated Management** - Reduce manual work through automated participant tracking
6. **Player Engagement** - Facilitate easy player registration and tournament discovery

## 🚀 How It Works

### For Tournament Organizers:

1. **Sign In** - Authenticate using your Google account
2. **Create Tournament** - Fill out tournament details including:
   - Tournament name and description
   - Sport type selection
   - Date and location (city, state)
   - Prize information
   - Upload tournament banner/photo
3. **Manage Players** - Add players to your tournaments with:
   - Player names and contact information
   - Email addresses and phone numbers
   - Seeding information
   - Profile pictures
4. **Monitor Participation** - View real-time participant counts
5. **Manage Tournaments** - Edit, delete, and view tournament details

### For Players:

1. **Browse Tournaments** - Discover tournaments in your area using advanced filters
2. **View Details** - See tournament information, dates, locations, and participant lists
3. **Search & Filter** - Find tournaments by city, state, or specific sport
4. **Participate** - Join tournaments that interest you

### Authentication Flow:

1. User clicks "Login with Google"
2. Redirected to Google OAuth consent screen
3. After approval, user is redirected back with authentication
4. Session is established with secure cookies
5. User can access protected routes and features

### Player Registration Workflow:

1. Tournament creator navigates to tournament management
2. Uploads player data (name, email, phone, seed)
3. System validates and stores player information
4. Database trigger automatically updates participant count
5. Players can view tournament details and participant lists

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Authentication strategy
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Express Session** - Session management

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE IF NOT EXISTS public.users (
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    google_id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone,
    login_method character varying(100) COLLATE pg_catalog."default" NOT NULL,
    profile_pic character varying(500) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_google_id_key UNIQUE (google_id)
);
```

### Tournament Table

```sql
CREATE TABLE IF NOT EXISTS public.tournament (
    id integer NOT NULL DEFAULT nextval('tournament_id_seq'::regclass),
    name character varying(300) COLLATE pg_catalog."default" NOT NULL,
    sport character varying(100) COLLATE pg_catalog."default" NOT NULL,
    dateoftournament date NOT NULL,
    createdby character varying COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description character varying(500) COLLATE pg_catalog."default",
    participants integer,
    location character varying(500) COLLATE pg_catalog."default",
    picture text COLLATE pg_catalog."default",
    prize character varying(100) COLLATE pg_catalog."default",
    city character varying(100) COLLATE pg_catalog."default",
    state character varying(100) COLLATE pg_catalog."default",
    banner_pic text COLLATE pg_catalog."default",
    CONSTRAINT tournament_pkey PRIMARY KEY (id),
    CONSTRAINT tournament_createdby_fkey FOREIGN KEY (createdby)
        REFERENCES public.users (google_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

### Players Table

```sql
CREATE TABLE IF NOT EXISTS public.players (
    id integer NOT NULL DEFAULT nextval('players_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    seed integer,
    profile_pic character varying(500) COLLATE pg_catalog."default",
    tournament_id integer,
    email_id character varying(100) COLLATE pg_catalog."default",
    contact_number text COLLATE pg_catalog."default",
    CONSTRAINT players_pkey PRIMARY KEY (id),
    CONSTRAINT unique_tournament_entry_by_player UNIQUE (tournament_id, name),
    CONSTRAINT players_tournament_id_fkey FOREIGN KEY (tournament_id)
        REFERENCES public.tournament (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

## 🔄 Database Triggers

### Participant Count Update Trigger

```sql
-- Trigger: trg_update_participants
CREATE OR REPLACE TRIGGER trg_update_participants
    AFTER INSERT OR DELETE OR UPDATE
    ON public.players
    FOR EACH ROW
    EXECUTE FUNCTION public.update_participants_count();
```

This trigger automatically updates the participant count in the tournament table whenever players are added, removed, or updated. The trigger function `update_participants_count()` ensures real-time accuracy of participant numbers.

## 🔧 API Endpoints

### Authentication

- `GET /auth/google` - Initiate Google OAuth login
- `GET /auth/google/callback` - OAuth callback handler
- `GET /auth/user` - Get current user information
- `GET /auth/logout` - Logout user

### Tournaments

- `GET /api/tournaments` - Get user's tournaments
- `POST /api/tournaments` - Create new tournament
- `GET /api/tournaments/:id` - Get specific tournament
- `GET /api/tournaments/filter` - Filter tournaments by city/state/sport
- `GET /api/tournaments/delete/:id` - Delete tournament

### Players

- `GET /api/players/tournament/:id` - Get players for a tournament
- `POST /api/players/add/tournament/:id` - Add players to tournament

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lets_play_bad
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   Create `.env` file in the backend directory:

   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=drawMaker
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   SESSION_SECRET=your_session_secret
   ```

5. **Database Setup**

   ```sql
   -- Run the complete database schema provided above
   -- Including tables, constraints, and triggers
   ```

6. **Run the Application**

   Backend:

   ```bash
   cd backend
   npm start
   ```

   Frontend:

   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 📂 Project Structure

```
lets_play_bad/
├── backend/
│   ├── controllers/
│   ├── db/
│   │   └── pool.js
│   ├── routes/
│   │   ├── playerRoutes.js
│   │   ├── tournament_routes.js
│   │   └── updateTournament.js
│   ├── utils/
│   │   └── Passport.js
│   ├── uploads/
│   ├── server.js
│   ├── db.config.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Login.jsx
│   │   │   ├── Logout.jsx
│   │   │   ├── My_tournaments_player.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Scoreboard.jsx
│   │   │   ├── Success.jsx
│   │   │   ├── SuccessIndicator.jsx
│   │   │   ├── Tournament_card_for_creator.jsx
│   │   │   └── UploadPlayers.jsx
│   │   ├── pages/
│   │   │   ├── Create_tournament.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing_page.jsx
│   │   │   ├── viewBrackets.jsx
│   │   │   └── ViewTournament.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── assets/
│   │   ├── fonts/
│   │   └── pictures/
│   └── package.json
└── README.md
```

## 🔒 Security Features

- **OAuth 2.0 Authentication** - Secure Google login
- **Session Management** - Encrypted session cookies
- **CORS Protection** - Configured for secure cross-origin requests
- **File Upload Validation** - Restricted file types and sizes
- **Input Sanitization** - Protected against SQL injection
- **Environment Variables** - Sensitive data stored securely
- **Database Constraints** - Unique constraints and foreign key relationships
- **Trigger-based Validation** - Automated data integrity checks

## 🔄 Workflow

### Tournament Creation Workflow:

1. User authenticates via Google OAuth
2. Navigates to tournament creation page
3. Fills tournament details (name, sport, date, location, etc.)
4. Uploads tournament banner/photo
5. System validates input and creates tournament
6. Tournament appears in user's dashboard

### Player Registration Workflow:

1. Tournament creator selects tournament for player management
2. Uploads player data (CSV or manual entry)
3. System validates player information
4. Players are added to tournament with unique constraints
5. Database trigger automatically updates participant count
6. Tournament details reflect new participant count

### Tournament Discovery Workflow:

1. Users browse available tournaments
2. Apply filters by city, state, or sport
3. View tournament details and participant lists
4. Access tournament information for participation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Versus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📧 Contact

For questions, suggestions, or support, please create an issue in the repository.

## 🚧 Roadmap

- [x] Tournament bracket generation
- [x] Player registration system
- [x] Real-time participant counting
- [x] Advanced search and filtering
- [ ] Real-time match scoring
- [ ] Tournament statistics and analytics
- [ ] Mobile app development
- [ ] Payment integration for tournament fees
- [ ] Notification system
- [ ] Tournament brackets visualization
- [ ] Match scheduling system
- [ ] Player rankings and statistics

---

**Built with ❤️ for the racket sports community**

**Regards: Jay Mehta**
