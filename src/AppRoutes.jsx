import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import GlobalContext from './context/GlobalContext';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
};

export default AppRoutes;
