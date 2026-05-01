import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Timeline } from '@/components/Timeline'

describe('Timeline Component', () => {
  it('renders without crashing', () => {
    render(<Timeline />)
    // Testing if at least one stage label is present (e.g. THE RUN UP or whatever is the first label)
    // The text is uppercase due to CSS, but the raw text might be 'The Run Up' or similar
    // Let's just check for 'The Run Up' which is standard
    expect(screen.getByText('The Run Up', { exact: false })).toBeInTheDocument()
  })
})
