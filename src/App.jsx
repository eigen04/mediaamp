import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProfile } from '@clerk/clerk-react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import GameGrid from './components/GameGrid';
import GameDetail from './pages/GameDetails';
import Library from './pages/Library';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import './App.css';

// Create a protected route component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/signin" replace />
      </SignedOut>
    </>
  );
};

function App() {
  const [filters, setFilters] = useState({
    categories: [],
    tags: [],
    yearRange: [2000, 2023],
    rating: 0
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Header onSearch={handleSearch} />
          
          <Routes>
            {/* Home page with game grid */}
            <Route path="/" element={
              <main className="main-content">
                <LeftSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
                <GameGrid
                  filters={filters}
                  searchTerm={searchTerm}
                />
              </main>
            } />
            
            {/* Game detail page */}
            <Route path="/game/:id" element={<GameDetail />} />
            
            {/* Auth routes */}
            <Route path="/signin/*" element={<LoginPage />} />
            <Route path="/signup/*" element={<SignUpPage />} />
            
            {/* SSO callback routes */}
            <Route path="/sso-callback" element={<LoginPage />} />
            <Route path="/signin/sso-callback" element={<LoginPage />} />
            <Route path="/signup/sso-callback" element={<SignUpPage />} />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="auth-container">
                  <UserProfile />
                </div>
              </ProtectedRoute>
            } />
            
            {/* Protected library route */}
            <Route path="/library" element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;