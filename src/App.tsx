import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FavoriteRoutes from "./pages/FavoriteRoutes";
import SavedTrips from "./pages/SavedTrips";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/planner" element={<Home />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/favorites" element={<FavoriteRoutes />} />

      <Route path="/history" element={<SavedTrips />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}