import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checklist } from '@/components/ui/Checklist'

// Mock Firebase modules
jest.mock('@/lib/firebase', () => ({
  auth: null,
  db: null,
}))

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null) // No user
    return jest.fn() // unsubscribe
  }),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}))

const mockItems = [
  { id: 101, label: 'Confirm Age Qualification', checked: false },
  { id: 102, label: 'Verify Citizenship Status', checked: false },
  { id: 103, label: 'Check State Residency Requirements', checked: false },
]

describe('Checklist Component', () => {
  it('renders the checklist heading', () => {
    render(<Checklist items={mockItems} stageId={1} />)
    expect(screen.getByText('Your Checklist')).toBeInTheDocument()
  })

  it('renders all checklist items', () => {
    render(<Checklist items={mockItems} stageId={1} />)
    expect(screen.getByText('Confirm Age Qualification')).toBeInTheDocument()
    expect(screen.getByText('Verify Citizenship Status')).toBeInTheDocument()
    expect(screen.getByText('Check State Residency Requirements')).toBeInTheDocument()
  })

  it('renders correct number of checkboxes', () => {
    render(<Checklist items={mockItems} stageId={1} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })

  it('toggles checkbox state on click', () => {
    render(<Checklist items={mockItems} stageId={1} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('returns null when items array is empty', () => {
    const { container } = render(<Checklist items={[]} stageId={1} />)
    expect(container.innerHTML).toBe('')
  })

  it('shows sign-in button when user is not logged in', () => {
    render(<Checklist items={mockItems} stageId={1} />)
    expect(screen.getByText('Sign In to Save')).toBeInTheDocument()
  })
})
