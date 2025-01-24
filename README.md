# Octal Task - Backend for Login and Register APIs

This repository contains the backend implementation for a simple login and register API using Node.js and Express. The backend is designed to interact with a frontend developed using Next.js and TypeScript, utilizing React Query for data fetching. This was part of an interview task for the company **Octal**.

## Features

- User registration
- User login
- Password hashing using `bcryptjs`
- JWT-based authentication
- MongoDB integration using `mongoose`

## Technologies Used

### Backend:

- **Node.js**: Server runtime
- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling
- **jsonwebtoken**: For generating and verifying JWTs
- **bcryptjs**: For hashing passwords

### Frontend:

- **Next.js**: React framework with server-side rendering and static site generation
- **TypeScript**: For type-safe code
- **React Query**: For efficient server-state management

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- npm or yarn
- MongoDB (running instance or cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000` by default.

--

## Frontend Integration

This backend is designed to work seamlessly with the following frontend stack:

- **Framework**: Next.js
- **Language**: TypeScript
- **State Management**: React Query

## For API calls, React Query with axios can be used to manage server-state efficiently.

## Acknowledgments

This project was created as part of an interview task for **Octal**. Thank you for the opportunity!
