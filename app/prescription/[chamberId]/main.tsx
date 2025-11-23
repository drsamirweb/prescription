"use client"
import React, { useState } from 'react'

const PrescriptionForm = () => {
    const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <form className="mt-6 w-full max-w-sm space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1"
            >
              Patient Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-1">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      )}
      
      {step === 2 && (
        <form className="mt-6 w-full max-w-sm space-y-4">
          <div>
            <label
              htmlFor="prescription"
              className="block text-sm font-medium mb-1"
            >
              Prescription
            </label>
            <textarea
              id="prescription"
              name="prescription"
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter prescription"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        </form>
      )}
    </>
  )
}

export default PrescriptionForm