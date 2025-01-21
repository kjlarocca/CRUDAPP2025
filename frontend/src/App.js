import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import InventoryPage from './components/InventoryPage';
import AddOrEditItemPage from './components/AddOrEditItemPage';
import ItemDetailsPage from './components/ItemDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/create-item" element={<AddOrEditItemPage />} />
        <Route path="/edit-item/:id" element={<AddOrEditItemPage />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
