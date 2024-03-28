// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from './authGuard';
import { AuthProvider } from './authContext'; 
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import AddData from './pages/addData/addData.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<AuthGuard element={<Home />} />} />
          <Route path="/tambah-data" element={<AuthGuard element={<AddData />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;