import React, { useState, useCallback, useEffect } from 'react';
import { FaSearch, FaBookmark, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((term) => onSearch(term), 300),
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 fixed-top">
      <Link className="navbar-brand fw-bold me-3" to="/">
        <span className="logo-box">GameHub</span>
      </Link>

      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#headerNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="headerNavbar">
        <form
          className="d-flex mx-auto my-3 my-lg-0 w-100 w-lg-50"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2 bg-secondary text-white border-0"
            type="search"
            placeholder="Search games..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-info" type="submit">
            <FaSearch />
          </button>
        </form>

        <ul className="navbar-nav ms-auto align-items-center gap-2">
          {isLoaded ? (
            isSignedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center gap-1" to="/library">
                    <FaBookmark /> Library
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center gap-1" to="/profile">
                    <FaUser /> {user?.firstName || 'Profile'}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white d-flex align-items-center gap-1" to="/signin">
                  <FaUser /> Sign In
                </Link>
              </li>
            )
          ) : (
            <li className="nav-item text-white">Loading...</li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
