import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Sidebar } from '@/components/layout/Sidebar'

describe('Sidebar Component', () => {
  it('renders the Why It Matters section', () => {
    render(<Sidebar />)
    expect(screen.getByText('Why It Matters')).toBeInTheDocument()
  })

  it('renders the Common Pitfalls section', () => {
    render(<Sidebar />)
    expect(screen.getByText('COMMON PITFALLS')).toBeInTheDocument()
  })

  it('renders pitfall items', () => {
    render(<Sidebar />)
    expect(screen.getByText(/Using an expired ID document/i)).toBeInTheDocument()
    expect(screen.getByText(/Incorrectly typing residential ZIP codes/i)).toBeInTheDocument()
  })

  it('renders the Quick Links section', () => {
    render(<Sidebar />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  it('renders all quick link items', () => {
    render(<Sidebar />)
    expect(screen.getByText('Candidate Profiles')).toBeInTheDocument()
    expect(screen.getByText('Find Polling Locations')).toBeInTheDocument()
    expect(screen.getByText('My Personalized Ballot')).toBeInTheDocument()
    expect(screen.getByText('Registration Info')).toBeInTheDocument()
  })

  it('renders the promo card', () => {
    render(<Sidebar />)
    expect(screen.getByText('Learn more about Voting Methods')).toBeInTheDocument()
  })

  it('has correct link destinations for quick links', () => {
    render(<Sidebar />)
    const candidatesLink = screen.getByText('Candidate Profiles').closest('a')
    expect(candidatesLink).toHaveAttribute('href', '/candidates')
    const locationsLink = screen.getByText('Find Polling Locations').closest('a')
    expect(locationsLink).toHaveAttribute('href', '/locations')
  })
})
