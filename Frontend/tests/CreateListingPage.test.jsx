import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CreateListingPage from './CreateListingPage'

global.fetch = vi.fn()
global.alert = vi.fn()

describe('CreateListingPage Component', () => {
  test('renders form fields', () => {
    render(
      <BrowserRouter>
        <CreateListingPage userEmail="test@scu.edu" />
      </BrowserRouter>
    )
    
    expect(screen.getByPlaceholderText(/listing name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument()
  })

  test('shows alert when submitting without image', () => {
    render(
      <BrowserRouter>
        <CreateListingPage userEmail="test@scu.edu" />
      </BrowserRouter>
    )
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(alert).toHaveBeenCalledWith('Please upload an image for your listing')
  })

  test('handles image upload', () => {
    render(
      <BrowserRouter>
        <CreateListingPage userEmail="test@scu.edu" />
      </BrowserRouter>
    )
    
    const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' })
    const input = screen.getByLabelText(/upload/i)
    
    fireEvent.change(input, { target: { files: [file] } })
    
    expect(input.files[0]).toBe(file)
  })
})
