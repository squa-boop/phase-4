// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <h1>Welcome to Event Planner</h1>
      <p>Your one-stop solution for planning and organizing events.</p>
      <div className="d-flex justify-content-between">
        <Link className="btn btn-primary" to="/events">Browse Events</Link>
        <Link className="btn btn-secondary" to="/login">Login</Link>
        <Link className="btn btn-success" to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
