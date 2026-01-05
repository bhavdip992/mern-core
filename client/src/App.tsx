import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NotePage from "./pages/NotePage";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/profile" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/note" element={<ProtectedRoute> <NotePage /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
