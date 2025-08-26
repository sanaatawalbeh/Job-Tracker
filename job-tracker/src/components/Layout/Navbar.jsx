import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 current path بدون #
  const currentPath = window.location.hash.replace("#", "");

  return (
    <nav className="navbar">
      <h2>JobTracker</h2>
      <div
        className={`navbar-links ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <NavLink to="/" className={currentPath === "/" ? "active" : ""}>
          Home
        </NavLink>
        <NavLink
          to="/register"
          className={currentPath === "/register" ? "active" : ""}
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className={currentPath === "/login" ? "active" : ""}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
