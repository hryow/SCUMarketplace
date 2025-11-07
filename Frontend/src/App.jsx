import { useState } from 'react'
import Header from './components/Header.jsx'
import './App.css'
import { Route,Routes } from 'react-router-dom'

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

          </Routes>
        </>

      </div>
        
  )
}

export default App
