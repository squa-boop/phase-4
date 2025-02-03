import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/events/${eventId}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <p>{event.status}</p>
    </div>
  );
}
