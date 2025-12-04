import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import ListingDetailPage from './ListingDetailPage'

global.fetch = vi.fn()
global.confirm = vi.fn()

describe('ListingDetailPage Component', () => {
  const mockListing = {
    id: 1,
    title: 'Test Item',
    price: 100,
    description: 'Test description',
    email: 'seller@scu.edu',
    photo: '/test.jpg',
    location: 'Test Location'
  }

  test('displays listing details', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/listing/1', state: { listing: mockListing } }]}>
        <ListingDetailPage userEmail="buyer@scu.edu" />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Test Item')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  test('deletes listing when confirmed', async () => {
    confirm.mockReturnValueOnce(true)
    fetch.mockResolvedValueOnce({ ok: true, status: 204 })

    render(
      <MemoryRouter initialEntries={[{ pathname: '/listing/1', state: { listing: mockListing } }]}>
        <ListingDetailPage userEmail="seller@scu.edu" />
      </MemoryRouter>
    )
    
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)
    
    expect(confirm).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith('/api/deletelisting/1', { method: 'DELETE' })
  })
})
