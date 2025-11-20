import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage.jsx'
import GalleryPage from './components/GalleryPage.jsx'
import ListingCard from './components/ListingCard.jsx'
import ListingDetailPage from './components/ListingDetailPage.jsx';
import CreateListingPage from './components/CreateListingPage.jsx';

function App() {

  const userEmail = "testingemai@scu.edu";

  return (
    <div>
        <Routes>
          {/* Three below divs are place holders for actual pages */}
          <Route path='/' element = {<LoginPage />} />
          <Route path='/Gallery' element = {<GalleryPage />} />
          <Route path='/listing' element = {<CreateListingPage userEmail={userEmail} />} />
          <Route path='/listing/:id' element={<ListingDetailPage userEmail={userEmail} />} />
        </Routes>
    </div>
  )
}
export default App
