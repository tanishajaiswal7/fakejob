import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Landing from './pages/Landing';
import AnalysisForm from './pages/AnalysisForm';
import Results from './pages/Results';
import History from './pages/History';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles/global.css';
import './styles/unified-design.css';

export const Link = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick}>{children}</a>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [result, setResult] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const navigate = (page, state = {}) => {
    if (page === '/') {
      setCurrentPage('landing');
    } else if (page === '/login') {
      setCurrentPage('login');
    } else if (page === '/signup') {
      setCurrentPage('signup');
    } else if (page === '/analyze') {
      if (!auth) {
        setCurrentPage('login');
        return;
      }
      setCurrentPage('form');
    } else if (page === '/results') {
      setCurrentPage('results');
      setResult(state.result || null);
    } else if (page === '/history') {
      if (!auth) {
        setCurrentPage('login');
        return;
      }
      setCurrentPage('history');
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(null);
    setCurrentPage('landing');
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header auth={auth} navigate={navigate} handleLogout={handleLogout} />
      <main>
        {currentPage === 'landing' && <Landing navigate={navigate} auth={auth} />}
        {currentPage === 'login' && <Login navigate={navigate} setAuth={setAuth} />}
        {currentPage === 'signup' && <Signup navigate={navigate} setAuth={setAuth} />}
        {currentPage === 'form' && auth && <AnalysisForm navigate={navigate} />}
        {currentPage === 'results' && auth && <Results result={result} navigate={navigate} />}
        {currentPage === 'history' && auth && <History navigate={navigate} />}
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 FakeJobDetector. All rights reserved. | Protect yourself from employment scams.</p>
        </div>
      </footer>
    </div>
  );
}
