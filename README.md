# Basic Todos - My First MERN Stack Project

A full-stack todo application built with the MERN (MongoDB, Express, React, Node.js) stack and TypeScript. This is a beginner-friendly project demonstrating core concepts of building a complete web application from frontend to backend.

## Project Overview

This is a simple yet effective todo application where users can:
- Create new todos
- View all todos
- Update todo titles
- Mark todos as completed
- Delete todos

Perfect for learning MERN stack fundamentals with TypeScript!

## What is MERN?

**MERN** is a popular JavaScript stack for building full-stack web applications:
- **M** - MongoDB: NoSQL database
- **E** - Express: Backend web framework
- **R** - React: Frontend UI library
- **N** - Node.js: JavaScript runtime for the backend

## Tech Stack

### Frontend
- **React 19** - UI library for building user interfaces
- **TypeScript** - Adds static typing to JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM (Object Document Mapper)
- **TypeScript** - Type-safe backend code
- **CORS** - Handle cross-origin requests
- **dotenv** - Environment variable management

## Project Structure

```
basic-todos/
│
├── client/                          # React Frontend Application
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   ├── pages/
│   │   │   └── TodoPage.tsx        # Main todo page
│   │   ├── services/
│   │   │   └── todo.api.ts         # API service calls
│   │   ├── types/
│   │   │   └── todo.ts             # TypeScript interfaces
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   └── App.css                 # App styles
│   ├── index.html                  # HTML template
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json               # TypeScript config
│   ├── eslint.config.js            # Linting configuration
│   └── package.json                # Dependencies
│
├── server/                          # Express Backend Application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── todo.controller.ts # Request handlers
│   │   ├── models/
│   │   │   └── todos.model.ts     # MongoDB schema
│   │   ├── routes/
│   │   │   └── todo.routes.ts     # API routes
│   │   ├── app.ts                 # Express app setup
│   │   └── server.ts              # Server entry point
│   ├── .env                        # Environment variables
│   ├── tsconfig.json               # TypeScript config
│   └── package.json                # Dependencies
│
└── README.md                        # This file
```

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - Either local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd basic-todos
```

### Step 2: Setup Backend Server

Navigate to the server directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

**For Local MongoDB:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todos-app
```

**For MongoDB Atlas (Cloud):**
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todos-app
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

### Step 3: Setup Frontend Application

From the project root, navigate to the client directory:
```bash
cd client
npm install
```

## Running the Application

### Start Backend Server (Terminal 1)

From the `server` directory:
```bash
npm run dev
```

Expected output:
```
Server running on port 3000
```

### Start Frontend Development Server (Terminal 2)

From the `client` directory:
```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another available port)

## Available Scripts

### Frontend (`client/`)
```bash
npm run dev       # Start development server with hot reload
npm run build     # Build for production
npm run lint      # Check code quality with ESLint
npm run preview   # Preview production build locally
```

### Backend (`server/`)
```bash
npm run dev       # Start development server with auto-reload
npm run build     # Compile TypeScript to JavaScript
npm start         # Run compiled JavaScript
npm run test      # Run tests (if configured)
```

## API Endpoints

All requests are made to `http://localhost:3000/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get a specific todo by ID |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

### API Request/Response Examples

**Create a Todo (POST)**
```json
// Request
{
  "title": "Learn MERN Stack"
}

// Response
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Learn MERN Stack",
  "completed": false,
  "createdAt": "2024-01-01T10:30:00Z",
  "updatedAt": "2024-01-01T10:30:00Z"
}
```

**Update a Todo (PUT)**
```json
// Request
{
  "title": "Learn MERN Stack - In Progress",
  "completed": true
}

// Response
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Learn MERN Stack - In Progress",
  "completed": true,
  "createdAt": "2024-01-01T10:30:00Z",
  "updatedAt": "2024-01-01T11:30:00Z"
}
```

## How It Works

### Frontend Flow
1. **TodoPage.tsx** - Main component that manages todo state
2. **todo.api.ts** - Makes HTTP requests to backend API using Axios
3. **todo.ts** - TypeScript types for type safety

### Backend Flow
1. **routes/** - Defines API endpoints
2. **controllers/** - Handles business logic
3. **models/** - Defines MongoDB schema with Mongoose
4. **config/db.ts** - Connects to MongoDB

### Data Flow
```
User Action → React Component → API Call → Express Route → 
Controller → MongoDB → Response → Update React State → 
Re-render UI
```

## Building for Production

### Frontend Build
```bash
cd client
npm run build
```
Creates optimized build in `client/dist/` directory

### Backend Build
```bash
cd server
npm run build
```
Compiles TypeScript to JavaScript in `server/dist/` directory

## Learning Concepts Demonstrated

This project is an excellent learning resource for:
- Setting up a Node.js/Express server
- Connecting to MongoDB with Mongoose
- Creating RESTful API endpoints
- Building React components and managing state
- Making API calls from frontend with Axios
- TypeScript in both frontend and backend
- Environment variables with dotenv
- CORS handling
- Hot module reloading during development

## Configuration Files

### TypeScript Configuration
Both frontend and backend have `tsconfig.json` to configure TypeScript compilation settings.

### Environment Variables
Backend uses `.env` file for configuration:
- `PORT` - Server port number
- `MONGODB_URI` - Database connection string

### ESLint Configuration
Frontend has `eslint.config.js` for code quality checks.

### Vite Configuration
Frontend uses `vite.config.ts` for build optimization and dev server settings.

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use, you can change them in:
- Backend: Edit `PORT` in `.env` file
- Frontend: Edit `vite.config.ts`

### MongoDB Connection Failed
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string in `.env`
- Verify firewall settings allow database connections

### Hot Reload Not Working
- Restart the development server
- Clear browser cache (Ctrl+Shift+Delete)
- Check that file changes are being saved

## Next Steps to Enhance

Ideas to extend this project:
- Add user authentication (JWT)
- Add due dates and categories to todos
- Implement todo priorities
- Add data export/import
- Create a mobile app version
- Add unit and integration tests
- Implement websockets for real-time updates
- Add dark mode
- Deploy to production (Heroku, Vercel, AWS)

## License

ISC

## Author

bhavdip-dodiya

---

**Happy coding!** This is the beginning of your MERN stack journey. Keep building awesome projects!
