import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

describe('Header Component', () => {
  test('renders with user email', () => {
    render(
      <BrowserRouter>
        <Header userEmail="test@scu.edu" />
      </BrowserRouter>
    )
    
    expect(screen.getByText(/test@scu.edu/i)).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Header userEmail="test@scu.edu" />
      </BrowserRouter>
    )
    
    const galleryLink = screen.getByRole('link', { name: /gallery/i })
    expect(galleryLink).toHaveAttribute('href', '/Gallery')
  })
})
