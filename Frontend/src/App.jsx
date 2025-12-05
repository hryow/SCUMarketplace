import { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage.jsx';
import GalleryPage from './components/GalleryPage.jsx';
import ListingDetailPage from './components/ListingDetailPage.jsx';
import CreateListingPage from './components/CreateListingPage.jsx';

function App() {
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();

  return (
    <div> 
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path='/' 
            element={userEmail ? <Navigate to="/Gallery" /> : <LoginPage setUserEmail={setUserEmail}/>}
          />
          <Route 
            path='/Gallery' 
            element={userEmail ? <GalleryPage userEmail={userEmail} /> : <Navigate to="/" />} 
          />
          <Route 
            path='/listing' 
            element={userEmail ? <CreateListingPage userEmail={userEmail} /> : <Navigate to="/" />} 
          />
          <Route 
            path='/listing/:id' 
            element={userEmail ? <ListingDetailPage userEmail={userEmail} /> : <Navigate to="/" />} 
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
export default App
