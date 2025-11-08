import { useState } from 'react'
import Header from './components/Header.jsx'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import ListingDetailPage from './components/ListingDetailPage.jsx';

function App() {
  return (
      <div>
            
          <Header />
        <>
          <Routes>
            {/* Three below divs are place holders for actual pages */}
            <Route path='/profile' element = {<div>profile</div>} />
            
            <Route path='/Gallery' element = {<div>Gallery</div>} />

            <Route path='/Listing' element = {<div>Listing</div>} />

            <Route path='/listing/:id' element={<ListingDetailPage />} />
          </Routes>
        </>

      </div>
        
  )
}

export default App
