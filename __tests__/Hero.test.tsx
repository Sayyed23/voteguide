import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/ui/Hero'

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'See how the election process works step by step'
    )
  })

  it('renders the subheading description', () => {
    render(<Hero />)
    expect(
      screen.getByText('A curated roadmap through the democratic architecture of your district.')
    ).toBeInTheDocument()
  })

  it('shows the current stage label', () => {
    render(<Hero activeStageId={3} />)
    expect(screen.getByText(/YOUR STAGE: Verification/i)).toBeInTheDocument()
  })

  it('displays step counter correctly', () => {
    render(<Hero activeStageId={5} />)
    expect(screen.getByText('STEP 5 OF 7')).toBeInTheDocument()
  })

  it('renders progress bar', () => {
    const { container } = render(<Hero activeStageId={4} />)
    const progressBar = container.querySelector('[style*="width"]')
    expect(progressBar).toBeInTheDocument()
  })

  it('defaults to stage 2 when no prop is provided', () => {
    render(<Hero />)
    expect(screen.getByText(/YOUR STAGE: Registration/i)).toBeInTheDocument()
  })
})
