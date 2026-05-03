import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { AIAssistant } from '@/components/ui/AIAssistant'

describe('AIAssistant Component', () => {
  it('renders the floating action button', () => {
    render(<AIAssistant />)
    expect(screen.getByLabelText('Open AI Assistant')).toBeInTheDocument()
  })

  it('opens chat window when FAB is clicked', () => {
    render(<AIAssistant />)
    fireEvent.click(screen.getByLabelText('Open AI Assistant'))
    expect(screen.getByText('Election Assistant')).toBeInTheDocument()
  })

  it('displays initial greeting message', () => {
    render(<AIAssistant />)
    fireEvent.click(screen.getByLabelText('Open AI Assistant'))
    expect(
      screen.getByText('Hi! I am the VoteGuide Assistant. How can I help you prepare for the election today?')
    ).toBeInTheDocument()
  })

  it('closes chat window when close button is clicked', () => {
    render(<AIAssistant />)
    fireEvent.click(screen.getByLabelText('Open AI Assistant'))
    expect(screen.getByText('Election Assistant')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('Close Election Assistant'))
    // After closing, the FAB should be visible again
    expect(screen.getByLabelText('Open AI Assistant')).toBeInTheDocument()
  })

  it('has an input field for user messages', () => {
    render(<AIAssistant />)
    fireEvent.click(screen.getByLabelText('Open AI Assistant'))
    expect(screen.getByLabelText('Ask about voting')).toBeInTheDocument()
  })

  it('disables send button when input is empty', () => {
    render(<AIAssistant />)
    fireEvent.click(screen.getByLabelText('Open AI Assistant'))
    expect(screen.getByLabelText('Send message')).toBeDisabled()
  })

  it('enables send button when input has text', () => {
    render(<AIAssistant />)
    fireEvent.click(screen.getByLabelText('Open AI Assistant'))
    fireEvent.change(screen.getByLabelText('Ask about voting'), {
      target: { value: 'How do I register?' },
    })
    expect(screen.getByLabelText('Send message')).not.toBeDisabled()
  })
})
