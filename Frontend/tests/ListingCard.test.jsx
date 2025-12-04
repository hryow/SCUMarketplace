import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ListingCard from './ListingCard'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('ListingCard Component', () => {
  const mockListing = {
    id: 1,
    photo: '/test.jpg',
    title: 'MacBook Pro',
    price: 1200
  }

  test('renders listing information correctly', () => {
    render(
      <BrowserRouter>
        <ListingCard listingData={mockListing} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument()
    expect(screen.getByText('$1200')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg')
  })

  test('navigates to detail page when clicked', () => {
    render(
      <BrowserRouter>
        <ListingCard listingData={mockListing} />
      </BrowserRouter>
    )
    
    const card = screen.getByRole('img').closest('div')
    fireEvent.click(card)
    
    expect(mockNavigate).toHaveBeenCalledWith('/listing/1', {
      state: { listing: mockListing }
    })
  })
})
