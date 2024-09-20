import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row text-center mt-5 text-md-start">
          <div className="col-md-4 footer-section">
            <h5>GET HELP</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="#">Home</NavLink>
              </li>
              <li>
                <NavLink to="#">Nike</NavLink>
              </li>
              <li>
                <NavLink to="#">Adidas</NavLink>
              </li>
              <li>
                <NavLink to="#">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-section">
            <h5>SUPPORT</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="#">About</NavLink>
              </li>
              <li>
                <NavLink to="#">Contact</NavLink>
              </li>
              <li>
                <NavLink to="#">Help</NavLink>
              </li>
              <li>
                <NavLink to="#">Phone</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-section">
            <h5>REGISTER</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="#">Register</NavLink>
              </li>
              <li>
                <NavLink to="#">Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>
          © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
          Khải.
        </p>
      </div>
    </footer>
  );
};

export default Footer; // Export mặc định Footer
