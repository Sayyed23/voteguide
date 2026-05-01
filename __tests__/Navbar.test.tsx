import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/Navbar'

describe('Navbar Component', () => {
  it('renders the brand logo', () => {
    render(<Navbar />)
    expect(screen.getByText('The Editorial Chronology')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Timeline')).toBeInTheDocument()
    expect(screen.getByText('Candidates')).toBeInTheDocument()
    expect(screen.getByText('Locations')).toBeInTheDocument()
    expect(screen.getByText('My Ballot')).toBeInTheDocument()
    expect(screen.getByText('Registration')).toBeInTheDocument()
  })
})
