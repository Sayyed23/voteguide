import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StageContent } from '@/components/layout/StageContent'

import { StageData } from '@/data/timelineData'

const mockStageData: StageData = {
  id: 1,
  slug: 'eligibility',
  label: 'Eligibility',
  icon: 'M12 2L2 7l10 5 10-5-10-5z',
  stagePrefix: 'STAGE 01',
  title: 'Voter Eligibility',
  description: 'Before you can register, you must meet the fundamental requirements.',
  steps: [
    { num: '01', title: 'Age Requirement', desc: 'You must be at least 18 years old.' },
    { num: '02', title: 'Citizenship', desc: 'You must be a citizen.' },
    { num: '03', title: 'Residency', desc: 'You must have established residency.' },
  ],
  checklist: [
    { id: 101, label: 'Test Checklist', checked: false }
  ],
  faqs: [
    { question: 'Test FAQ?', answer: 'Test Answer.' }
  ]
}


describe('StageContent Component', () => {
  it('renders the stage prefix', () => {
    render(<StageContent data={mockStageData} />)
    expect(screen.getByText('STAGE 01')).toBeInTheDocument()
  })

  it('renders the stage title', () => {
    render(<StageContent data={mockStageData} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Voter Eligibility' })).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<StageContent data={mockStageData} />)
    expect(
      screen.getByText(/Before you can register, you must meet the fundamental requirements/i)
    ).toBeInTheDocument()
  })

  it('renders all process steps', () => {
    render(<StageContent data={mockStageData} />)
    expect(screen.getByText('Age Requirement')).toBeInTheDocument()
    expect(screen.getByText('Citizenship')).toBeInTheDocument()
    expect(screen.getByText('Residency')).toBeInTheDocument()
  })

  it('renders step numbers', () => {
    render(<StageContent data={mockStageData} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<StageContent data={mockStageData} />)
    expect(screen.getByText('Add to Checklist')).toBeInTheDocument()
    expect(screen.getByText('Set Reminder')).toBeInTheDocument()
  })

  it('renders navigation arrows', () => {
    const { container } = render(<StageContent data={mockStageData} />)
    const links = container.querySelectorAll('a[href^="/stage/"]')
    expect(links.length).toBe(2) // prev and next navigation links
  })

  it('returns null when data is null', () => {
    const { container } = render(<StageContent data={null as any} />)
    expect(container.innerHTML).toBe('')
  })
})
