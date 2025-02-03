import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { addUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const success = await addUser(username, email, password);
      if (success) {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      alert("Error during registration");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-4 shadow-lg"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Register</h3>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="form-label text-muted fw-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control rounded-pill"
            placeholder="Enter Username"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label text-muted fw-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control rounded-pill"
            placeholder="Enter Email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label text-muted fw-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control rounded-pill"
            placeholder="Password"
            required
          />
        </div>

        {/* Repeat Password Input */}
        <div className="mb-4">
          <label htmlFor="repeatPassword" className="form-label text-muted fw-semibold">
            Repeat Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="form-control rounded-pill"
            placeholder="Repeat Password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 rounded-pill fw-semibold"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <div className="text-center mt-3">
          <p className="text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary fw-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
