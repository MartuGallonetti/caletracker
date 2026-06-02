import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Importamos el Dashboard
import Habits from './pages/Habits';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Nueva ruta del panel principal */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;