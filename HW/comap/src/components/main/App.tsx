import React, { useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Sidebar from './Sidebar';
import Header from './Header';
import Map from '../maps/GoogleMap';
import { UserContext, UserContextProvider } from '../users/UserContext';
import Footer from './Footer';


function App() {
  return (
    <>
    <UserContextProvider>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </UserContextProvider>
    </>
  );
}

export default App;
