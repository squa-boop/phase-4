import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const navigate = useNavigate();  // Use useNavigate instead of useHistory
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your add event logic here (e.g., axios POST request)

    // After event is added, navigate to another page
    navigate('/events');  // This uses useNavigate to redirect
  };

  return (
    <div>
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
