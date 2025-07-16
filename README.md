# Versus - Tournament Management System

A modern web application for creating and managing racket sport tournaments with Google OAuth authentication.

## 🏸 About

Versus is a full-stack tournament management system designed specifically for racket sports enthusiasts. Users can create, manage, and participate in tournaments for various racket sports including badminton, tennis, table tennis, and more.

## ✨ Features

### Core Features

- **Google OAuth Authentication** - Secure login using Google accounts
- **Tournament Creation** - Create tournaments with custom details and images
- **Multi-Sport Support** - Support for various racket sports:
  - Badminton
  - Tennis
  - Table Tennis
  - Squash
  - Racquetball
  - Pickleball
  - Padel
  - Beach Tennis
- **Image Upload** - Upload tournament banners and photos
- **User Dashboard** - View and manage your created tournaments
- **Session Management** - Persistent login sessions with secure cookies

### Technical Features

- **Responsive Design** - Built with Tailwind CSS for mobile-first design
- **Real-time Updates** - Dynamic content loading and updates
- **File Upload Support** - Image handling with preview functionality
- **Cross-Origin Support** - Proper CORS configuration for frontend-backend communication

## 🎯 Project Goals

1. **Simplify Tournament Organization** - Provide an easy-to-use platform for organizing racket sport tournaments
2. **Community Building** - Connect players and tournament organizers in one platform
3. **Modern User Experience** - Deliver a fast, responsive, and intuitive interface
4. **Scalable Architecture** - Built with modern technologies for future expansion

## 🚀 How It Works

### For Tournament Organizers:

1. **Sign In** - Authenticate using your Google account
2. **Create Tournament** - Fill out tournament details including:
   - Tournament name and description
   - Sport type selection
   - Date and location
   - Upload tournament banner/photo
3. **Manage** - View and manage all your created tournaments from the dashboard

### For Players:

1. **Browse Tournaments** - Discover tournaments in your area
2. **View Details** - See tournament information, dates, and locations
3. **Participate** - Join tournaments that interest you

### Authentication Flow:

1. User clicks "Login with Google"
2. Redirected to Google OAuth consent screen
3. After approval, user is redirected back with authentication
4. Session is established with secure cookies
5. User can access protected routes and features

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

### Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profile_pic TEXT,
    login_method VARCHAR(50) DEFAULT 'google',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sport VARCHAR(100) NOT NULL,
    dateOfTournament DATE NOT NULL,
    location TEXT,
    photo VARCHAR(255),
    createdBy VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

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

   ```bash
   # Create database and tables using the schema above
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
│   │   └── tournament_routes.js
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
│   │   │   ├── Navbar.jsx
│   │   │   ├── Success.jsx
│   │   │   └── Scoreboard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing_page.jsx
│   │   │   └── Create_tournament.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── assets/
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

- [ ] Tournament bracket generation
- [ ] Player registration system
- [ ] Real-time match scoring
- [ ] Tournament statistics and analytics
- [ ] Mobile app development
- [ ] Payment integration for tournament fees
- [ ] Notification system
- [ ] Advanced search and filtering

---

**Built with ❤️ for the racket sports community**

**Regards: Jay Mehta**
