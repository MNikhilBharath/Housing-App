// App.js - Main application component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingForm from './ListingForm';
import ListingList from './ListingList';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define application routes */}
        <Routes>
          {/* Route for the listing submission form (homepage) */}
          <Route path="/" element={<ListingForm />} />
          {/* Route for the listings display page */}
          <Route path="/listings" element={<ListingList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
