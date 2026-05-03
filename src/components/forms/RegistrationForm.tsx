/**
 * @fileoverview Multi-step voter registration form simulator.
 * Guides users through a 4-step process: Personal Info → Address →
 * ID Verification → Review & Submit. Data is persisted to localStorage
 * upon submission. Uses useCallback for optimized event handling.
 */

'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

/** Shape of the registration form data */
interface RegistrationData {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  idNumber: string;
}

/** Initial empty form state */
const INITIAL_FORM_DATA: RegistrationData = {
  firstName: '',
  lastName: '',
  dob: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  idNumber: '',
};

/**
 * RegistrationForm renders a 4-step wizard that simulates the voter
 * registration process with client-side validation and progress tracking.
 */
export const RegistrationForm = React.memo(function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>(INITIAL_FORM_DATA);

  /** Handle controlled input field changes */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  /** Advance to next step (max 4) */
  const nextStep = useCallback(() => setStep(prev => Math.min(prev + 1, 4)), []);
  /** Return to previous step (min 1) */
  const prevStep = useCallback(() => setStep(prev => Math.max(prev - 1, 1)), []);

  /** Handle final form submission */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call with 1.5s delay
    setTimeout(() => {
      localStorage.setItem('voterRegistration', JSON.stringify(formData));
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  }, [formData]);

  /** Calculate progress percentage for the UI bar */
  const progressWidth = useMemo(() => `${((step - 1) / 3) * 100}%`, [step]);

  if (isSuccess) {
    return (
      <div className="glass-card p-12 text-center rounded-3xl border border-brand-teal/30 relative overflow-hidden" role="alert">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-brand-teal text-brand-dark rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(79,209,197,0.5)] animate-bounce" aria-hidden="true">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Application Submitted!</h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
            Your voter registration application has been received. You will receive a confirmation email and your official voter card by mail in 2-3 weeks.
          </p>
          <div className="bg-brand-navy p-4 rounded-xl border border-white/10 mb-8 inline-block">
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Confirmation Number</span>
            <span className="text-2xl font-display font-bold text-brand-teal">VTR-84729-A</span>
          </div>
          <div>
            <Link href="/" className="btn-primary inline-flex">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative" aria-labelledby="form-title">
      <h1 id="form-title" className="sr-only">Voter Registration Form</h1>
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12 relative" aria-label={`Step ${step} of 4`}>
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -translate-y-1/2 z-0" aria-hidden="true" />
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-brand-teal -translate-y-1/2 z-0 transition-all duration-500" 
          style={{ width: progressWidth }}
          aria-hidden="true"
        />
        
        {[1, 2, 3, 4].map((num) => (
          <div 
            key={num} 
            className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 font-bold ${
              step >= num 
                ? 'bg-brand-teal text-brand-dark shadow-[0_0_15px_rgba(79,209,197,0.4)]' 
                : 'bg-brand-navy text-gray-500 border border-gray-700'
            }`}
            aria-hidden="true"
          >
            {step > num ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : num}
          </div>
        ))}
      </div>

      <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                <input 
                  id="firstName"
                  required type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                  placeholder="Legal First Name"
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                <input 
                  id="lastName"
                  required type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                  placeholder="Legal Last Name"
                  autoComplete="family-name"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="dob" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Date of Birth</label>
                <input 
                  id="dob"
                  required type="date" name="dob" value={formData.dob} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                  autoComplete="bday"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Residential Address</h2>
            <p className="text-gray-400 text-sm mb-6">Your address determines your voting district. Do not use a P.O. Box.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2">
                <label htmlFor="street" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Street Address</label>
                <input 
                  id="street"
                  required type="text" name="street" value={formData.street} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                  placeholder="123 Civic Ave, Apt 4B"
                  autoComplete="street-address"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                <input 
                  id="city"
                  required type="text" name="city" value={formData.city} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                  placeholder="City"
                  autoComplete="address-level2"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="state" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">State</label>
                  <input 
                    id="state"
                    required type="text" name="state" value={formData.state} onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                    placeholder="ST"
                    autoComplete="address-level1"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="zip" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">ZIP Code</label>
                  <input 
                    id="zip"
                    required type="text" name="zip" value={formData.zip} onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                    placeholder="12345"
                    autoComplete="postal-code"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Identification */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Identification Verification</h2>
            <p className="text-gray-400 text-sm mb-6">We need to verify your identity to ensure election security. Provide your State ID or Driver&apos;s License Number.</p>
            <div className="mb-8">
              <label htmlFor="idNumber" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">ID Number</label>
              <input 
                id="idNumber"
                required type="text" name="idNumber" value={formData.idNumber} onChange={handleChange}
                className="w-full max-w-md bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                placeholder="Ex: A1234567"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <svg className="w-4 h-4 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure 256-bit encryption
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Review Application</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-4">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider col-span-1">Name</span>
                <span className="text-white col-span-2 font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-4">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider col-span-1">DOB</span>
                <span className="text-white col-span-2 font-medium">{formData.dob}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-4">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider col-span-1">Address</span>
                <span className="text-white col-span-2 font-medium">{formData.street}, {formData.city}, {formData.state} {formData.zip}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider col-span-1">ID Number</span>
                <span className="text-white col-span-2 font-medium">••••{formData.idNumber.slice(-4)}</span>
              </div>
            </div>
            
            <label className="flex items-start gap-4 p-5 bg-brand-teal/5 border border-brand-teal/20 rounded-xl cursor-pointer hover:border-brand-teal/50 transition-all mb-8">
              <input required type="checkbox" className="mt-1 w-5 h-5 rounded border-brand-teal/30 bg-transparent text-brand-teal focus:ring-brand-teal/50" />
              <span className="text-sm text-gray-300">
                I affirm under penalty of perjury that I am a U.S. citizen, meet the age requirements, and the information provided is true and accurate.
              </span>
            </label>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <button 
            type="button" 
            onClick={prevStep} 
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white border border-white/10 hover:border-white/30'}`}
            aria-label="Previous step"
          >
            Back
          </button>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-brand-teal text-brand-dark px-8 py-3 rounded-full font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              step === 4 ? 'Submit Application' : 'Continue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
});
