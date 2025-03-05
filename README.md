# Music Review Application

A web application for music enthusiasts to share and discover music reviews. Users can create accounts, write reviews, rate songs, and explore reviews by other users.

## Features

- User authentication (login/register)
- Create and share music reviews
- Rate songs on a 5-star scale
- Search functionality for reviews and artists
- Browse reviews by artists
- Responsive design for all devices

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm

### Installation

1. Clone the repository
2. Install backend dependencies:
```bash
cd backend
npm install

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Running the Application
1. Start the backend server:
```bash
cd backend
npm run dev
 ```

2. Start the frontend application:
```bash
cd frontend
npm start
 ```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5002

## API Endpoints
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- GET /api/products - Get all reviews
- POST /api/products - Create new review
- GET /api/products/artists - Get all artists
- GET /api/products/artist/:artistName - Get reviews by artist

## Contributing
Feel free to submit issues and enhancement requests.

## License
This project is licensed under the ISC License.

```plaintext

This README provides essential information about your application, including setup instructions, features, and API endpoints. Users and contributors can quickly understand what your application does and how to get it running.
 ```
```