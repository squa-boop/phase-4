import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { EventProvider } from './context/EventContext';
import Layout from './components/Layout'; // Layout component that includes Navbar and Footer
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import EventsList from './pages/EventList';
import Dashboard from './pages/Dashboard';

import './App.css';
// import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <BrowserRouter>
      {/* Wrap the entire app with both providers */}
      <UserProvider>
        <EventProvider>
          <Routes>
            {/* Layout will wrap all routes and include Navbar, Outlet (dynamic content), and Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route
                path="/create-event"
                element={
                  // <ProtectedRoute>
                    <CreateEvent />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute>
                    <Profile />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                    <Dashboard />
                  // </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
