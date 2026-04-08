import React, { useState } from 'react';
import '../styles/header.css';

export default function Header({ auth, navigate, handleLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavClick = (page) => {
    navigate(page);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <button 
              onClick={() => handleNavClick('/')}
              className="logo-button"
            >
              �️ JobShield AI
            </button>
          </div>
          <nav className="nav">
            <button 
              onClick={() => handleNavClick('/')}
              className="nav-link"
            >
              Home
            </button>
            {auth && (
              <>
                <button 
                  onClick={() => handleNavClick('/analyze')}
                  className="nav-link"
                >
                  Analyze
                </button>
                <button 
                  onClick={() => handleNavClick('/history')}
                  className="nav-link"
                >
                  History
                </button>
              </>
            )}
          </nav>
          
          <div className="header-auth">
            {auth ? (
              <div className="user-menu">
                <div className="user-profile">
                  <span className="user-avatar">{auth.name.charAt(0).toUpperCase()}</span>
                  <button 
                    className="user-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {auth.name}
                  </button>
                </div>
                
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item user-email">{auth.email}</div>
                    <hr />
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  onClick={() => handleNavClick('/login')}
                  className="btn-secondary"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleNavClick('/signup')}
                  className="btn-primary"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
