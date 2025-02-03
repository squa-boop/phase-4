import React from 'react';  // <-- Add this import
import ReactDOM from 'react-dom/client'; // Use this for React 18+
import App from './App'; // Make sure this is correct based on your file structure

// Create root and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
