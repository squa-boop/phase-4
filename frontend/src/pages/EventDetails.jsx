// src/pages/EventDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from the backend
    axios.get(`/api/events/${eventId}`)
      .then(response => {
        if (response.status === 200 && response.headers['content-type'].includes('application/json')) {
          setEvent(response.data);  // Set the event details if the response is JSON
        } else {
          console.error('Invalid response format:', response);
        }
      })
      .catch(err => {
        console.error('Error fetching event details:', err);
      });
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      {/* Add more event details here */}
    </div>
  );
};

export default EventDetails;
