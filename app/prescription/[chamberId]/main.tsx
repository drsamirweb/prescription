"use client"
import React, { useState } from 'react'
import suggestions from '@/data/suggestions.json'
import { X } from 'lucide-react' // Using Lucide icons for the remove button

const PrescriptionForm = () => {
  const [step, setStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);

  // Store field values as arrays
  const [formData, setFormData] = useState<{
    [key: string]: string[];
  }>({
    chiefComplaint: [],
    history: [],
    diagnosis: [],
    rx: [],
    advices: [],
    followUp: [],
    referredTo: [],
  });

  const handleAddItem = (field: string, value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
    const el = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement;
    if (el) el.value = '';
  };

  const handleRemoveItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSelectSuggestion = (field: string, value: string) => {
    handleAddItem(field, value);
    setShowSuggestions(null);
  };

  const renderInputWithList = (field: string, placeholder: string, rows: number = 1) => (
    <div className="relative mb-4">
      <label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">
        {field.replace(/([A-Z])/g, ' $1')}
      </label>
      {rows > 1 ? (
        <textarea
          id={field}
          name={field}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(field)}
          onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
        />
      ) : (
        <input
          id={field}
          name={field}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(field)}
          onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
        />
      )}

      <button
        type="button"
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={() => {
          const el = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement;
          if (el) handleAddItem(field, el.value);
        }}
      >
        Add
      </button>

      {formData[field].length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {formData[field].map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm shadow-sm"
            >
              {item}
              <X
                size={14}
                className="cursor-pointer hover:text-red-600"
                onClick={() => handleRemoveItem(field, idx)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full px-4 py-6 mx-auto relative">
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
        <div className="mt-6 w-full max-w-7xl grid grid-cols-1 gap-6 relative">
          <form
            className="space-y-4 md:col-span-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Prescription submitted!');
            }}
          >
            {renderInputWithList('chiefComplaint', 'Enter chief complaint', 3)}
            {renderInputWithList('history', 'Enter history', 3)}
            {renderInputWithList('diagnosis', 'Enter diagnosis', 3)}
            {renderInputWithList('rx', 'Enter prescription', 4)}
            {renderInputWithList('advices', 'Enter advices', 3)}
            {renderInputWithList('followUp', 'Enter follow-up details')}
            {renderInputWithList('referredTo', 'Enter referred to details (optional)')}

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

          {/* Suggestions panel */}
          <div className="hidden absolute right-0 md:block">
            <div className="fixed top-16">
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
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;
