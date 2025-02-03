import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/events')  // Ensure this URL is correct
      .then(response => {
        if (response.status === 200 && response.headers['content-type'].includes('application/json')) {
          console.log('Received events:', response.data);  // Log the response data for debugging
          if (Array.isArray(response.data)) {
            setEvents(response.data);
          } else {
            console.error('Expected an array of events, but received:', response.data);
            setEvents([]);  // Fallback to empty array if data is not an array
          }
        } else {
          console.error('Invalid response format:', response);
          setEvents([]);  // Handle cases where response is not in the expected format
        }
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setEvents([]);  // Fallback to empty array in case of error
      })
      .finally(() => {
        setLoading(false);  // Set loading to false after the request
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Events</h2>
      <div className="list-group">
        {loading ? (
          <p>Loading events...</p> // Show loading indicator
        ) : events.length === 0 ? (
          <p>No events found.</p>  // Show no events message
        ) : (
          events.map(event => (
            <a key={event.id} href={`/events/${event.id}`} className="list-group-item list-group-item-action">
              {event.title}
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsList;
