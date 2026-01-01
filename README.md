# Notes App

A full-stack notes taking application built with TypeScript, React, Express, and MongoDB. Create, read, update, and delete notes with an intuitive UI powered by Tailwind CSS.

## Features

- **Create Notes** - Add new notes with title and content
- **Edit Notes** - Modify existing notes
- **Delete Notes** - Remove notes you no longer need
- **Search Notes** - Find notes quickly with search functionality
- **Persistent Storage** - All notes are saved to MongoDB database
- **Modern UI** - Clean and responsive design with Tailwind CSS
- **Fast Development** - Hot module reloading with Vite

## Tech Stack

### Frontend
- **React** 19 - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js/Express** - Web server and API
- **TypeScript** - Type-safe backend code
- **MongoDB/Mongoose** - Database and ODM
- **CORS** - Cross-origin resource sharing

## Project Structure

```
basic-todos/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service calls
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Helper utilities
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Client dependencies
│   └── vite.config.ts     # Vite configuration
│
└── server/                # Backend Express application
    ├── src/
    │   ├── config/        # Database configuration
    │   ├── controllers/    # Route controllers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   ├── app.ts         # Express app setup
    │   └── server.ts      # Server entry point
    ├── .env               # Environment variables
    ├── package.json       # Server dependencies
    └── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection string)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd basic-todos
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/notes-app
   ```

   Or use MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notes-app
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Terminal 1 - Start the Backend Server:**
```bash
cd server
npm run dev
```
The server will run on `http://localhost:3000`

**Terminal 2 - Start the Frontend Development Server:**
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173` (or another available port)

## Available Scripts

### Frontend (client/)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Backend (server/)
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run test` - Run tests (if configured)

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Usage

1. Open your browser to `http://localhost:5173`
2. Use the form to add a new note with title and content
3. View all your notes as cards on the page
4. Search notes using the search bar
5. Click on a note to edit or delete it

## Development

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```
This creates an optimized build in `client/dist/`

**Backend:**
```bash
cd server
npm run build
```
This compiles TypeScript to JavaScript in the `server/dist/` directory

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

ISC

## Author

bhavdip-dodiya
