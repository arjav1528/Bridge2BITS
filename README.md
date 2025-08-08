# Bridge2BITS

A student community platform for BITS Pilani students to connect, share resources, and build their professional network.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Google Cloud Console Setup](#google-cloud-console-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Deployment](#deployment)

## Project Overview

Bridge2BITS is a web application that allows BITS Pilani students to:
- Authenticate using their institutional Google accounts
- Create and complete their profiles
- Connect with other students across all campuses
- Share resources and participate in a community forum

## Tech Stack

### Frontend
- React 18+
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router v7
- Axios (HTTP client)

### Backend
- Node.js
- Express.js v5
- MongoDB with Mongoose
- Passport.js (Authentication)
- JSON Web Tokens (JWT)

### Database
- MongoDB

## Project Structure

```
Bridge2BITS/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context for authentication
│   │   ├── Additives/     # UI components
│   │   └── ...
│   └── ...
├── server/                # Node.js backend server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── model/         # Database models
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── db/            # Database connection
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Google Cloud Console account
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Bridge2BITS
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

### Environment Variables

You need to set up environment variables for both the frontend and backend. Create `.env` files in the respective directories.

#### Backend Environment Variables (server/.env)

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/bridge2bits

# JWT secret for token signing (use a strong random string in production)
JWT_SECRET=your_jwt_secret_here

# Google OAuth 2.0 credentials (get from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Frontend URL for redirects
FRONTEND_URL=http://localhost:5173

# Server port
PORT=3000

# Node environment
NODE_ENV=development
```

#### Frontend Environment Variables (frontend/.env)

The frontend doesn't require any special environment variables as it uses hardcoded values for development.

#### Environment Variable Descriptions

1. **MONGO_URI**: Connection string for your MongoDB database. For local development, this is typically `mongodb://localhost:27017/bridge2bits`. For production, you might use MongoDB Atlas or another cloud provider.

2. **JWT_SECRET**: A secret key used to sign JWT tokens. This should be a long, random string in production. You can generate one using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
   ```

3. **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: These are obtained from Google Cloud Console when you set up OAuth 2.0 credentials. See the Google Cloud Console Setup section below.

4. **FRONTEND_URL**: The URL where your frontend application is hosted. This is used for redirects after authentication.

5. **PORT**: The port on which the backend server will run.

6. **NODE_ENV**: The Node.js environment. Set to `production` in production environments.

### Google Cloud Console Setup

To enable Google OAuth authentication, you need to set up a project in Google Cloud Console.

#### Creating a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. If you don't have an account, create one
3. Click on the project dropdown at the top of the page
4. Click "New Project"
5. Enter a project name (e.g., "Bridge2BITS")
6. Click "Create"

#### Setting up OAuth 2.0 Credentials

1. In the Google Cloud Console, make sure your project is selected
2. Navigate to "APIs & Services" > "Credentials" in the left sidebar
3. Click "Create Credentials" > "OAuth client ID"
4. If prompted to configure the OAuth consent screen:
   - Click "Configure Consent Screen"
   - Select "External" (or "Internal" if you're using a Google Workspace account)
   - Fill in the required fields:
     - App name: Bridge2BITS
     - User support email: Your email
     - Developer contact information: Your email
   - Click "Save and Continue"
   - For scopes, click "Save and Continue" (no additional scopes needed)
   - For test users, add your email if using External consent screen
   - Click "Save and Continue" and then "Back to Dashboard"
5. Now go back to "Credentials" and click "Create Credentials" > "OAuth client ID"
6. Select "Web application" as the application type
7. Give it a name (e.g., "Bridge2BITS Web Client")

#### Configuring Authorized Redirect URIs

In the "Authorized redirect URIs" section, add the following URIs:

For development:
- `http://localhost:3000/auth/google/callback`

For production (replace with your actual domain):
- `https://yourdomain.com/auth/google/callback`

#### Configuring Authorized JavaScript Origins

In the "Authorized JavaScript origins" section, add the following origins:

For development:
- `http://localhost:3000`
- `http://localhost:5173`

For production (replace with your actual domain):
- `https://yourdomain.com`

#### Obtaining Client ID and Client Secret

After creating the OAuth client ID:
1. Copy the "Client ID" - this goes in your `.env` file as `GOOGLE_CLIENT_ID`
2. Copy the "Client Secret" - this goes in your `.env` file as `GOOGLE_CLIENT_SECRET`

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the backend server:
```bash
cd server
npm start
```

## API Endpoints

### Authentication Routes
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - Logout user
- `GET /auth/me` - Get current user information
- `POST /auth/complete-profile` - Complete user profile
- `PUT /auth/update-profile` - Update user profile
- `GET /auth/students` - Get all students with completed profiles

### Protected Routes
All routes except authentication routes require a valid JWT token in the cookies.

## Database Schema

### User Model

```javascript
{
  googleId: String,           // Unique Google ID
  displayName: String,        // User's display name
  firstName: String,          // First name from Google
  lastName: String,           // Last name from Google
  email: String,              // Email (must be from BITS Pilani domains)
  profilePicture: String,     // Profile picture URL from Google
  bio: String,                // User bio
  interests: [String],        // User interests
  branch: String,             // Academic branch
  year: String,               // Academic year
  campus: String,             // Campus (Goa, Pilani, Hyderabad)
  city: String,               // Current city
  university: String,         // University name
  studentId: String,          // Student ID
  phoneNumber: String,        // Phone number
  linkedinProfile: String,    // LinkedIn profile URL
  githubProfile: String,      // GitHub profile URL
  isProfileComplete: Boolean, // Profile completion status
  createdAt: Date             // Account creation date
}
```

## Authentication Flow

1. User clicks "Login with Google" button
2. Frontend redirects to `/auth/google` endpoint
3. Backend initiates Google OAuth flow
4. User authenticates with Google and grants permissions
5. Google redirects back to `/auth/google/callback`
6. Backend validates the user and creates/updates the user in the database
7. If the email domain is not authorized, user is redirected to unauthorized page
8. Backend generates a JWT token and sets it as an HTTP-only cookie
9. User is redirected back to the frontend
10. Frontend makes a request to `/auth/me` to get user information
11. User is now authenticated and can access protected routes

## Deployment

### Backend Deployment

1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Deploy the server code to a hosting platform (Heroku, Vercel, AWS, etc.)
3. Set the environment variables in your hosting platform
4. Update the `FRONTEND_URL` to your frontend deployment URL
5. Update the Google OAuth redirect URIs in Google Cloud Console

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)
3. Update the backend URLs in the frontend code if needed

### Environment Considerations

- Set `NODE_ENV=production` in production
- Use HTTPS in production
- Set `secure: true` for cookies in production
- Update CORS origins to match your production domain