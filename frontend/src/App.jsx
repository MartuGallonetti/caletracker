import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import Habits from './pages/Habits';
import Categories from "./pages/Categories.jsx"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación sueltas */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <Login />
          </div>
        } />
        
        <Route path="/register" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <Register />
          </div>
        } />
        
        {/* Estructura del Dashboard y sus vistas hijas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/habits" element={<Habits />} />
        <Route path="/dashboard/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;