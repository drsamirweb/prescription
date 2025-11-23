"use client"
import React, { useState } from 'react'
import suggestions from '@/data/suggestions.json'


const PrescriptionForm = () => {
  const [step, setStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);

  const handleSelectSuggestion = (field: string, value: string) => {
    const el = document.getElementById(field) as HTMLTextAreaElement | HTMLInputElement;
    if (el) {
      el.value = value;
      el.focus();
    }
    setShowSuggestions(null);
  };

  return (
    <>
      {step === 1 && (
        <form className="mt-6 w-full max-w-sm space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
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
              type="tel"
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
            Next
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="mt-6 w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <form
            className="space-y-4 md:col-span-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Prescription submitted!');
            }}
          >
            <div className="relative">
              <label htmlFor="chiefComplaint" className="block text-sm font-medium mb-1">
                Chief Complaint
              </label>
              <textarea
                id="chiefComplaint"
                name="chiefComplaint"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter chief complaint"
                onFocus={() => setShowSuggestions('chiefComplaint')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>
            <div className="relative">
              <label htmlFor="history" className="block text-sm font-medium mb-1">
                History
              </label>
              <textarea
                id="history"
                name="history"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter history"
                onFocus={() => setShowSuggestions('history')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                On Examinations (Select Pictures)
              </label>
              <input
                id="examinationImages"
                name="examinationImages"
                type="file"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
              />
            </div>
            <div className="relative">
              <label htmlFor="diagnosis" className="block text-sm font-medium mb-1">
                Diagnosis
              </label>
              <textarea
                id="diagnosis"
                name="diagnosis"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter diagnosis"
                onFocus={() => setShowSuggestions('diagnosis')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>
            <div className="relative">
              <label htmlFor="rx" className="block text-sm font-medium mb-1">
                Rx (Prescription)
              </label>
              <textarea
                id="rx"
                name="rx"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter prescription"
                onFocus={() => setShowSuggestions('rx')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>
            <div className="relative">
              <label htmlFor="advices" className="block text-sm font-medium mb-1">
                Advices
              </label>
              <textarea
                id="advices"
                name="advices"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter advices"
                onFocus={() => setShowSuggestions('advices')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>
            <div className="relative">
              <label htmlFor="followUp" className="block text-sm font-medium mb-1">
                Follow-up
              </label>
              <input
                id="followUp"
                name="followUp"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter follow-up details"
                onFocus={() => setShowSuggestions('followUp')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>

            <div className="relative">
              <label htmlFor="referredTo" className="block text-sm font-medium mb-1">
                Referred To
              </label>
              <input
                id="referredTo"
                name="referredTo"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter referred to details (optional)"
                onFocus={() => setShowSuggestions('referredTo')}
                onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="md:col-span-1">
            {showSuggestions && (
              <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 max-h-96 overflow-y-auto">
                <h3 className="text-sm font-semibold mb-2 capitalize">
                  {showSuggestions} Suggestions
                </h3>
                <ul className="space-y-1">
                  {suggestions[showSuggestions as keyof typeof suggestions]?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                      onMouseDown={() => handleSelectSuggestion(showSuggestions, item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PrescriptionForm;
