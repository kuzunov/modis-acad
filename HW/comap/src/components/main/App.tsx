import React, { useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Sidebar from './Sidebar';
import Header from './Header';
import Map from '../maps/GoogleMap';
import { UserContext, UserContextProvider } from '../users/UserContext';
import Footer from './Footer';
import { Container } from '@mui/material';


function App() {
  return (
    <>
    <UserContextProvider>
      <Header />
      <Container sx={{marginBottom:"100px", marginTop:"100px"}}>
        <Sidebar />
        <Outlet />
      </Container>
      <Footer />
    </UserContextProvider>
    </>
  );
}

export default App;
