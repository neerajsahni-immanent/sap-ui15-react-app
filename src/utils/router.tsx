import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import RegistrationPage from '../views/RegistrationPage';
import ProfileUpdatePage from '../views/ProfileUpdatePage';
import { UserModel } from '../models/userModel';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = UserModel.getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfileUpdatePage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
