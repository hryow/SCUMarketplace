import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GalleryPage from './GalleryPage'

global.fetch = vi.fn()

describe('GalleryPage Component', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('fetches and displays listings', async () => {
    const mockListings = [
      { id: 2, title: 'Item 2', price: 200, photo: '/item2.jpg' },
      { id: 1, title: 'Item 1', price: 100, photo: '/item1.jpg' }
    ]

    fetch.mockResolvedValueOnce({
      json: async () => mockListings
    })

    render(
      <BrowserRouter>
        <GalleryPage userEmail="test@scu.edu" />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
  })

  test('handles fetch error gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    fetch.mockRejectedValueOnce(new Error('Fetch failed'))

    render(
      <BrowserRouter>
        <GalleryPage userEmail="test@scu.edu" />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    consoleErrorSpy.mockRestore()
  })
})
