import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { EventContext } from "../context/EventContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { events, setEvents } = useContext(EventContext);  // Ensure setEvents is available for updating state
  const { current_user } = useContext(UserContext);

  // Define the deleteEvent function here
  const deleteEvent = (eventId) => {
    // Make the API call to delete the event
    axios.delete(`/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log("Event deleted:", response.data);
      // Update the events state by removing the deleted event
      setEvents(events.filter(event => event.id !== eventId));
    })
    .catch((error) => {
      console.error("Error deleting event:", error);
    });
  };

  return (
    current_user ? (
      <div>
        {events && events.length < 1 && (
          <div>
            You don't have events
            <Link to="/addevent">Create</Link>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {events &&
            events.map &&
            events.map((event) => (
              <div key={event.id} className="border border-blue-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span
                    onClick={() => deleteEvent(event.id)}  // Delete button
                    className="bg-red-600 px-1 text-white hover:cursor-pointer hover:bg-red-300"
                  >
                    Delete
                  </span>
                </div>

                {/* Wedding title */}
                <h3 className="font-semibold text-lg">{event.title}</h3>

                {/* Description */}
                <p className="text-sm mt-2">{event.description}</p>

                {/* Date */}
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(event.date).toLocaleString()}
                </p>

                {/* Location */}
                <p className="text-xs text-gray-600 mt-2">{event.location}</p>

                {/* Status */}
                <p
                  className={`border px-2 py-1 text-white mt-2 ${
                    event.status === 'active' ? 'bg-green-700' : 'bg-yellow-400'
                  }`}
                >
                  {event.status} {/* Display status */}
                </p>
              </div>
            ))}
        </div>
      </div>
    ) : (
      <div className="text-center">
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <Link to="/login" className="font-medium">
            Login
          </Link>{" "}
          to access this page.
        </div>
      </div>
    )
  );
}
