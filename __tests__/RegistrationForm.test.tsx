import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { RegistrationForm } from '@/components/forms/RegistrationForm'

describe('RegistrationForm Component', () => {
  it('renders step 1 - Personal Information', () => {
    render(<RegistrationForm />)
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
  })

  it('renders first name and last name fields', () => {
    render(<RegistrationForm />)
    expect(screen.getByPlaceholderText('Legal First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Legal Last Name')).toBeInTheDocument()
  })

  it('renders date of birth field', () => {
    render(<RegistrationForm />)
    expect(screen.getByText('Date of Birth')).toBeInTheDocument()
  })

  it('shows progress indicators for all 4 steps', () => {
    const { container } = render(<RegistrationForm />)
    // There should be 4 step indicators
    const stepIndicators = container.querySelectorAll('.rounded-full.flex.items-center.justify-center')
    expect(stepIndicators.length).toBeGreaterThanOrEqual(4)
  })

  it('displays Continue button on step 1', () => {
    render(<RegistrationForm />)
    expect(screen.getByText('Continue')).toBeInTheDocument()
  })

  it('accepts user input in first name field', () => {
    render(<RegistrationForm />)
    const input = screen.getByPlaceholderText('Legal First Name') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Jane' } })
    expect(input.value).toBe('Jane')
  })
})
