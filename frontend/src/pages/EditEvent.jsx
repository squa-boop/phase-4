import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use the correct import
import axios from 'axios';

function EditEvent() {
  const navigate = useNavigate();  // Updated to use useNavigate
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    // Fetch event data logic here
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the edited event logic (e.g., axios PUT request)
    
    // Navigate to events list
    navigate('/events');  // This uses useNavigate to programmatically navigate
  };

  return (
    <div>
      <h1>Edit Event</h1>
      {/* Render form for editing */}
      <form onSubmit={handleSubmit}>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditEvent;
