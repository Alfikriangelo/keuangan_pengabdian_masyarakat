// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from './authGuard';
import { AuthProvider } from './authContext'; 
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import AddDataRekap from './pages/addDataRekap/addDataRekap.jsx';
import AddDataPengeluaran from './pages/addDataPengeluaran/addDataPengeluaran.jsx';
import UpdateData from './pages/updateData/updateData.jsx';
import Pengeluaran from './pages/Pengeluaran/Pengeluaran.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rekap" element={<AuthGuard element={<Home />} />} />
          <Route path="/tambah-data-rekap" element={<AuthGuard element={<AddDataRekap />} />} />
          <Route path="/tambah-data-pengeluaran" element={<AuthGuard element={<AddDataPengeluaran />} />} />
          <Route path="/perbarui-data/:id" element={<AuthGuard element={<UpdateData />} />} />
          <Route path="/pengeluaran" element={<AuthGuard element={<Pengeluaran />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;