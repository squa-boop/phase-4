import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { EventProvider } from './context/EventContext';
import Layout from './components/Layout'; // Layout component that includes Navbar and Footer
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import ViewEvent from './pages/ViewEvent';
import EventsList from './pages/EventList';

import './App.css';

function App() {
  return (
    <Router>
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
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addevent" element={<AddEvent />} />
              <Route path="/edit-event/:eventId" element={<EditEvent />} />
              <Route path="/event/:eventId" element={<ViewEvent />} />
            </Route>
          </Routes>
        </EventProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
