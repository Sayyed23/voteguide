import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Timeline } from '@/components/ui/Timeline'

describe('Timeline Component', () => {
  it('renders without crashing', () => {
    render(<Timeline />)
    // Testing if at least one stage label is present
    expect(screen.getByText('Eligibility', { exact: false })).toBeInTheDocument()
  })
})
