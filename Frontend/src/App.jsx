import { useState } from 'react'
import Header from './components/Header.jsx'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import GalleryPage from './components/GalleryPage.jsx'
import ListingCard from './components/ListingCard.jsx'
import ListingDetailPage from './components/ListingDetailPage.jsx';

function App() {
  return (
    <div>
        <Header />
        {/* <ListingDetailPage /> */}
        <Routes>
          {/* Three below divs are place holders for actual pages */}
          <Route path='/profile' element = {<div>profile</div>} />
          <Route path='/Gallery' element = {<GalleryPage />} />
          <Route path='/Listing' element = {<ListingCard />} />
          <Route path='/listing/:id' element={<ListingDetailPage />} />
        </Routes>
    </div>
  )
}
export default App
