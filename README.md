# Twideo Backend - Video Sharing Platform API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.18.3-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v8.2.2-brightgreen.svg)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)

A production-ready, feature-rich RESTful API backend for a video-sharing platform similar to YouTube, built with Node.js, Express, and MongoDB.

[Features](#-features) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation) • [Installation](#-installation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Data Models](#-data-models)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Security Features](#-security-features)

---

## 🎯 Overview

Twideo Backend is a comprehensive video-sharing platform API that handles user authentication, video management, social interactions, and content delivery. Built with scalability and security in mind, it implements industry-standard practices including JWT authentication, secure password hashing, file upload handling, and cloud storage integration.

**Live API:** [https://URL.onrender.com](https://URL.onrender.com)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** with email and username validation
- **JWT-based Authentication** with access and refresh tokens
- **Secure Password Management** using bcrypt (10 salt rounds)
- **Token Refresh Mechanism** for seamless user sessions
- **Cookie-based Token Storage** with HTTP-only cookies
- **Role-based Access Control** for protected routes

### 🎥 Video Management
- **Video Upload & Publishing** with Cloudinary integration
- **Video CRUD Operations** (Create, Read, Update, Delete)
- **Thumbnail Management** with automatic processing
- **Video Metadata** (title, description, duration, views)
- **Publish/Unpublish Toggle** for draft management
- **Video Ownership Verification** middleware
- **Pagination Support** for video listings
- **Search Functionality** with query and sorting options
- **View Count Tracking** with automatic increment

### 👤 User Profile Management
- **User Profile Updates** (full name, email)
- **Avatar & Cover Image Upload** with Cloudinary
- **Channel Profile View** with aggregated statistics
- **Watch History Tracking** with timestamps
- **Watch History Management** (clear all, remove specific videos)
- **User Statistics** (subscribers, videos, views)

### 💬 Comment System
- **Nested Comment Support** on videos
- **Comment CRUD Operations**
- **Comment Pagination** for performance
- **Owner Verification** for comment modifications
- **Real-time Comment Count** for videos

### 👍 Like/Dislike System
- **Video Likes** with toggle functionality
- **Comment Likes** for engagement tracking
- **Tweet Likes** for blog posts
- **Like Status API** to check user's like state
- **Liked Videos Collection** for user profile

### 📱 Subscription System
- **Channel Subscription** with toggle functionality
- **Subscriber Count** for channels
- **Subscribed Channels List** for users
- **Subscription Status Check** API

### 📝 Tweet/Blog System
- **Create & Publish Tweets/Blogs**
- **Tweet CRUD Operations**
- **User-specific Tweet Retrieval**
- **Global Tweet Feed** with pagination
- **Tweet Ownership Verification**

### 📚 Playlist Management
- **Create Custom Playlists**
- **Add/Remove Videos** from playlists
- **Playlist CRUD Operations**
- **User Playlist Collection**
- **Channel Playlist Retrieval**
- **Playlist Video Population**

### 📊 Analytics Dashboard
- **Channel Statistics** (total videos, subscribers, views, likes)
- **Channel Video List** with metadata
- **Performance Metrics** aggregation
- **User Engagement Analytics**

### 🛠️ System Features
- **Health Check Endpoint** for monitoring
- **Error Handling Middleware** with custom error classes
- **File Upload Handling** with Multer
- **Cloud Storage Integration** (Cloudinary)
- **MongoDB Aggregation Pipelines** for complex queries
- **Pagination Plugin** for large datasets
- **CORS Configuration** for cross-origin requests
- **Request Validation** and sanitization

---

## 🚀 Tech Stack

### Core Technologies
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js v4.18.3
- **Database:** MongoDB v8.2.2 with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **File Storage:** Cloudinary

### Key Dependencies
```json
{
  "express": "^4.18.3",
  "mongoose": "^8.2.2",
  "mongoose-aggregate-paginate-v2": "^1.0.7",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^5.1.1",
  "cloudinary": "^2.0.3",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "cookie-parser": "^1.4.6",
  "dotenv": "^16.4.5"
}
```

### Development Tools
- **Nodemon** for hot-reloading
- **Prettier** for code formatting
- **ESM Modules** for modern JavaScript

---

## 🏗️ System Architecture

```
┌─────────────────┐
│   Client App    │
│  (Frontend)     │
└────────┬────────┘
         │
         │ HTTP/HTTPS
         │
┌────────▼────────┐
│  Express.js     │
│  API Server     │
├─────────────────┤
│  - CORS         │
│  - Auth JWT     │
│  - Routes       │
│  - Middleware   │
└───────┬─────────┘
        │
    ┌───┴────┐
    │        │
┌───▼──┐  ┌──▼────┐
│ DB   │  │Cloud  │
│Mongo │  │inary  │
└──────┘  └───────┘
```

### Folder Structure
```
src/
├── controllers/       # Request handlers and business logic
│   ├── user.controller.js
│   ├── video.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   ├── playlist.controller.js
│   ├── dashboard.controller.js
│   └── healthcheck.controller.js
├── models/            # MongoDB schemas and models
│   ├── user.model.js
│   ├── video.model.js
│   ├── comment.model.js
│   ├── like.model.js
│   ├── subsciption.model.js
│   ├── tweet.model.js
│   └── playlist.model.js
├── routes/            # API route definitions
│   ├── user.routes.js
│   ├── video.routes.js
│   ├── comment.routes.js
│   ├── like.routes.js
│   ├── subscription.routes.js
│   ├── tweet.routes.js
│   ├── playlist.routes.js
│   ├── dashboard.routes.js
│   └── healthcheck.routes.js
├── middlewares/       # Custom middleware functions
│   ├── auth.middleware.js      # JWT verification
│   ├── multer.middleware.js    # File upload handling
│   ├── error.middleware.js     # Error handling
│   └── video.middleware.js     # Video ownership check
├── utils/             # Helper functions and utilities
│   ├── ApiError.js            # Custom error class
│   ├── ApiResponse.js         # Standardized responses
│   ├── asyncHandler.js        # Async error wrapper
│   └── cloudinary.js          # Cloud storage utilities
├── db/                # Database configuration
│   └── index.js
├── app.js             # Express app configuration
├── index.js           # Server entry point
└── constants.js       # Application constants
```

---

## 📊 Data Models

### User Model
```javascript
{
  userName: String (unique, indexed),
  email: String (unique),
  fullName: String (indexed),
  avatar: String (Cloudinary URL),
  coverImage: String (Cloudinary URL),
  password: String (bcrypt hashed),
  watchHistory: [{ video: ObjectId, timestamp: Date }],
  refreshToken: String,
  timestamps: true
}
```

### Video Model
```javascript
{
  videoFile: String (Cloudinary URL),
  thumbnail: String (Cloudinary URL),
  owner: ObjectId (User reference),
  title: String,
  description: String,
  duration: Number,
  views: Number (default: 0),
  isPublished: Boolean,
  timestamps: true
}
```

### Comment Model
```javascript
{
  content: String,
  video: ObjectId (Video reference),
  owner: ObjectId (User reference),
  timestamps: true
}
```

### Like Model
```javascript
{
  video: ObjectId (Video reference),
  comment: ObjectId (Comment reference),
  tweet: ObjectId (Tweet reference),
  likedBy: ObjectId (User reference),
  timestamps: true
}
```

### Subscription Model
```javascript
{
  subscriber: ObjectId (User reference),
  channel: ObjectId (User reference),
  timestamps: true
}
```

### Playlist Model
```javascript
{
  name: String,
  description: String,
  owner: ObjectId (User reference),
  videos: [ObjectId] (Video references),
  timestamps: true
}
```

### Tweet Model
```javascript
{
  content: String,
  owner: ObjectId (User reference),
  timestamps: true
}
```

---

## 📡 API Documentation

### Base URL
```
Production: https://URL.onrender.com/api/v1
Development: http://localhost:8000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | ❌ |
| POST | `/users/login` | User login | ❌ |
| POST | `/users/logout` | User logout | ✅ |
| POST | `/users/refresh-token` | Refresh access token | ❌ |
| POST | `/users/change-password` | Change password | ✅ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/current-user` | Get current user | ✅ |
| PATCH | `/users/update-account` | Update user details | ✅ |
| PATCH | `/users/update-avatar` | Update avatar | ✅ |
| PATCH | `/users/update-cover-image` | Update cover image | ✅ |
| GET | `/users/c/:username` | Get channel profile | ✅ |
| GET | `/users/watch-history` | Get watch history | ✅ |
| PATCH | `/users/watch-history` | Clear watch history | ✅ |
| PATCH | `/users/watch-history/:videoId` | Remove from history | ✅ |

### Video Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/videos` | Get all videos (paginated) | ✅ |
| POST | `/videos` | Upload new video | ✅ |
| GET | `/videos/:videoId` | Get video by ID | ✅ |
| PATCH | `/videos/:videoId` | Update video | ✅ (Owner) |
| DELETE | `/videos/:videoId` | Delete video | ✅ (Owner) |
| PATCH | `/videos/toggle/publish/:videoId` | Toggle publish status | ✅ (Owner) |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/comments/:videoId` | Get video comments | ✅ |
| POST | `/comments/:videoId` | Add comment | ✅ |
| PATCH | `/comments/c/:commentId` | Update comment | ✅ (Owner) |
| DELETE | `/comments/c/:commentId` | Delete comment | ✅ (Owner) |

### Like Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/likes/toggle/v/:videoId` | Toggle video like | ✅ |
| POST | `/likes/toggle/c/:commentId` | Toggle comment like | ✅ |
| POST | `/likes/toggle/t/:tweetId` | Toggle tweet like | ✅ |
| GET | `/likes/v/:videoId` | Get video like info | ✅ |
| GET | `/likes/c/:commentId` | Get comment like info | ✅ |
| GET | `/likes/t/:tweetId` | Get tweet like info | ✅ |
| GET | `/likes/videos` | Get liked videos | ✅ |

### Subscription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/subscriptions/c/:channelId` | Toggle subscription | ✅ |
| GET | `/subscriptions/c/:channelId` | Get channel subscribers | ✅ |
| GET | `/subscriptions/u/:subscriberId` | Get subscribed channels | ✅ |
| GET | `/subscriptions/status/:channelId` | Check subscription status | ✅ |

### Playlist Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/playlist` | Create playlist | ✅ |
| GET | `/playlist/:playlistId` | Get playlist by ID | ✅ |
| PATCH | `/playlist/:playlistId` | Update playlist | ✅ (Owner) |
| DELETE | `/playlist/:playlistId` | Delete playlist | ✅ (Owner) |
| PATCH | `/playlist/add/:videoId/:playlistId` | Add video to playlist | ✅ (Owner) |
| PATCH | `/playlist/remove/:videoId/:playlistId` | Remove video | ✅ (Owner) |
| GET | `/playlist/user/:userId` | Get user playlists | ✅ |
| GET | `/playlist/channel/:userName` | Get channel playlists | ✅ |

### Tweet Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tweets` | Get all tweets | ✅ |
| POST | `/tweets` | Create tweet | ✅ |
| GET | `/tweets/u/:userId` | Get user tweets | ✅ |
| PATCH | `/tweets/:tweetId` | Update tweet | ✅ (Owner) |
| DELETE | `/tweets/:tweetId` | Delete tweet | ✅ (Owner) |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard/stats` | Get channel statistics | ✅ |
| GET | `/dashboard/videos` | Get channel videos | ✅ |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/healthcheck` | API health status | ❌ |

---

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for file storage
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd "Twideo backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.sample .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start production server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:8000`

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=8000

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# CORS Configuration (comma-separated for multiple origins)
CORS_ORIGIN=http://localhost:5173,https://your-frontend-domain.vercel.app

# JWT Secrets (use strong, random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Security Notes
- Never commit `.env` file to version control
- Use strong, randomly generated secrets for JWT tokens
- Rotate secrets periodically in production
- Restrict CORS_ORIGIN to trusted domains only

---

## 🔒 Security Features

### Implemented Security Measures

1. **Authentication & Authorization**
   - JWT-based stateless authentication
   - HTTP-only cookies for token storage
   - Access and refresh token rotation
   - Password hashing with bcrypt (10 rounds)

2. **Data Validation**
   - Input sanitization
   - MongoDB injection prevention
   - Type checking and validation
   - Required field enforcement

3. **Error Handling**
   - Custom error classes
   - Centralized error middleware
   - No sensitive data in error responses
   - Proper HTTP status codes

4. **CORS Configuration**
   - Whitelist-based origin validation
   - Credentials support
   - Configurable via environment variables

5. **File Upload Security**
   - File type validation
   - Size limits
   - Secure file storage (Cloudinary)
   - Temporary file cleanup

6. **Database Security**
   - Connection string in environment variables
   - Mongoose schema validation
   - Indexed fields for performance
   - Aggregation pipeline optimization

### Best Practices Followed
- Environment-based configuration
- Separation of concerns
- DRY principle
- RESTful API design
- Async/await error handling
- Middleware composition
- Code modularity

---

## 🧪 API Testing

### Sample Requests

**Register User**
```bash
curl -X POST http://localhost:8000/api/v1/users/register \
  -F "userName=johndoe" \
  -F "email=john@example.com" \
  -F "fullName=John Doe" \
  -F "password=securepass123" \
  -F "avatar=@/path/to/avatar.jpg" \
  -F "coverImage=@/path/to/cover.jpg"
```

**Login**
```bash
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'
```

**Upload Video**
```bash
curl -X POST http://localhost:8000/api/v1/videos \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "title=My First Video" \
  -F "description=Video description" \
  -F "videoFile=@/path/to/video.mp4" \
  -F "thumbnail=@/path/to/thumbnail.jpg" \
  -F "isPublished=true"
```

---

## 📈 Performance Optimizations

- **Database Indexing** on frequently queried fields
- **Aggregation Pipelines** for complex queries
- **Pagination** for large datasets
- **Lean Queries** where population not needed
- **Connection Pooling** with MongoDB
- **Cloudinary CDN** for file delivery
- **Async Operations** for non-blocking I/O

---

## 🤝 Contributing

This is a portfolio project. For suggestions or improvements, please open an issue or submit a pull request.

---

## 👨‍💻 Author

**Aditya Giri**

Built as a full-stack portfolio project demonstrating expertise in:
- RESTful API design
- Node.js & Express.js
- MongoDB & Mongoose
- Authentication & Authorization
- Cloud Storage Integration
- Production Deployment

---

**⭐ If you found this project helpful, please give it a star!**