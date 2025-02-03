import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Event Planner. All Rights Reserved.</p>

        {/* Social Media Icons */}
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="nav-item mx-3">
            <a href="https://facebook.com" target="_blank" className="nav-link">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="nav-item mx-3">
            <a href="https://twitter.com" target="_blank" className="nav-link">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="nav-item mx-3">
            <a href="https://instagram.com" target="_blank" className="nav-link">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
