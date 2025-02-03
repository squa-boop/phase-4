import React, { createContext, useEffect, useState } from "react";  // <-- Make sure React is imported here
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  // States to store authToken and current_user
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [current_user, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Logs the current user when it changes
  useEffect(() => {
    if (current_user !== null) {
      console.log("Current user changed:", current_user);
    }
  }, [current_user]);

  // LOGIN functionality
  const login = async (email, password) => {
    toast.loading("Logging you in ... ");

    try {
      const response = await fetch("https://phase-4-2.onrender.com/login", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log('Login response:', data); // Log login response

      if (response.ok && data.access_token) {
        toast.dismiss();
        sessionStorage.setItem("token", data.access_token);
        setAuthToken(data.access_token);

        // Fetch the current user after successful login
        await fetchCurrentUser(data.access_token);

        toast.success("Successfully Logged in");

        // Redirect to dashboard or any protected route
        navigate("/dashboard");

        return true;
      } else {
        toast.dismiss();
        toast.error(data.message || "Failed to login");

        return false;
      }
    } catch (error) {
      toast.dismiss();
      console.error("Login error:", error);
      toast.error("An error occurred during login");

      return false;
    }
  };

  // LOGOUT functionality
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthToken(null);
    setCurrentUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  // Function to fetch the current user
  const fetchCurrentUser = async (token) => {
    if (!token) return;

    setLoading(true); // Set loading state to true before fetching

    try {
      const response = await fetch('https://phase-4-2.onrender.com/current_user', {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // If the backend returns 401 Unauthorized
      if (response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
        setCurrentUser(null);
        setAuthToken(null);
        sessionStorage.removeItem("token");
        navigate("/login"); // Redirect to login if unauthorized
        return;
      }

      console.log('Fetched user data:', data); // Log the API response

      if (data && data.email) {
        setCurrentUser(data); // Set the user data directly
      } else {
        toast.error("No user data found or invalid response.");
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      toast.error("Failed to fetch current user");
      setCurrentUser(null);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch current user when authToken changes
  useEffect(() => {
    if (authToken) {
      fetchCurrentUser(authToken);
    } else {
      setLoading(false); // Stop loading if no authToken
    }
  }, [authToken]);

  // ===> REGISTER functionality (Add User)
  const addUser = async (username, email, password) => {
    toast.loading("Registering you...");

    try {
      const response = await fetch("https://phase-4-2.onrender.com/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.dismiss();
        toast.success("Registration successful");
        return true;
      } else {
        toast.dismiss();
        toast.error(data.msg || "Registration failed");
        return false;
      }
    } catch (error) {
      toast.dismiss();
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      return false;
    }
  };

  // Data to be passed to the context consumers
  const data = {
    authToken,
    login,
    addUser, // Add this to your context data
    current_user,
    logout,
    loading,
  };

  // Only render children if current_user data is available, otherwise show loading
  return (
    <UserContext.Provider value={data}>
      { children} {/* Conditional rendering */}
    </UserContext.Provider>
  );
};