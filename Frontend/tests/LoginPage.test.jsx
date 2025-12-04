import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

global.fetch = vi.fn()

describe('LoginPage Component', () => {
  test('renders login form by default', () => {
    render(
      <BrowserRouter>
        <LoginPage setUserEmail={vi.fn()} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Log In')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email@scu.edu')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
  })

  test('switches to sign up mode', () => {
    render(
      <BrowserRouter>
        <LoginPage setUserEmail={vi.fn()} />
      </BrowserRouter>
    )
    
    const signUpLink = screen.getByText('Sign up for free')
    fireEvent.click(signUpLink)
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument()
  })

  test('displays error message on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' })
    })

    render(
      <BrowserRouter>
        <LoginPage setUserEmail={vi.fn()} />
      </BrowserRouter>
    )
    
    fireEvent.change(screen.getByPlaceholderText('email@scu.edu'), {
      target: { value: 'test@scu.edu' }
    })
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'wrongpassword' }
    })
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument()
    })
  })
})
