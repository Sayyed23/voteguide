import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

describe('Footer Component', () => {
  it('renders the brand name', () => {
    render(<Footer />)
    expect(screen.getByText('The Digital Curator')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Footer />)
    expect(screen.getByText('Empowering democratic participation through clarity.')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Register to Vote')).toBeInTheDocument()
    expect(screen.getByText('Candidates')).toBeInTheDocument()
    expect(screen.getByText('Polling Locations')).toBeInTheDocument()
    expect(screen.getByText('My Ballot')).toBeInTheDocument()
  })

  it('renders the copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument()
  })

  it('has correct link destinations', () => {
    render(<Footer />)
    const registerLink = screen.getByText('Register to Vote').closest('a')
    expect(registerLink).toHaveAttribute('href')
    const candidatesLink = screen.getByText('Candidates').closest('a')
    expect(candidatesLink).toHaveAttribute('href')
  })
})
