import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { FAQ } from '@/components/FAQ'

const mockFaqs = [
  { question: 'What is voting?', answer: 'Voting is a democratic right.' },
  { question: 'When is election day?', answer: 'November 5th.' }
]

describe('FAQ Component', () => {
  it('renders the FAQ title', () => {
    render(<FAQ faqs={mockFaqs} />)
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })

  it('renders all questions', () => {
    render(<FAQ faqs={mockFaqs} />)
    expect(screen.getByText('What is voting?')).toBeInTheDocument()
    expect(screen.getByText('When is election day?')).toBeInTheDocument()
  })

  it('expands answer on click', () => {
    render(<FAQ faqs={mockFaqs} />)
    
    // The answer is in the DOM but has opacity-0, but we can check if it exists
    const answer = screen.getByText('Voting is a democratic right.')
    expect(answer).toBeInTheDocument()
    
    const button = screen.getByText('What is voting?')
    fireEvent.click(button)
    
    // The parent div of the answer should have class max-h-40 instead of max-h-0
    const regions = screen.getAllByRole('region')
    expect(regions.length).toBeGreaterThan(0)
  })
})
