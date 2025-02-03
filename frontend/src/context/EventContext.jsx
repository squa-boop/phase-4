import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { authToken } = useContext(UserContext);
  console.log("AuthToken in EventContext:", authToken); // Debugging

  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      console.error("No authentication token found");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    setLoading(true);
    fetch('https://phase-4-2.onrender.com/api/events', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError('Error fetching events');
        setLoading(false);
      });
  }, [authToken, navigate]);

  const data = {
    events,
    setEvents,
  };

  return (
    <EventContext.Provider value={data}>
      {children}
    </EventContext.Provider>
  );
};
