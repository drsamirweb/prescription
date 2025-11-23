// components/PrescriptionEditor.tsx
import React from 'react';

export default function PrescriptionEditor() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column: main notes */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <label>Chief Complaint</label>
          <textarea /* onFocus open suggestion side panel */ className="w-full h-20 p-2 border rounded" />
          <label className="mt-4">History</label>
          <textarea className="w-full h-24 p-2 border rounded" />
          <label className="mt-4">On Examination (add images)</label>
          <input type="file" accept="image/*" multiple />
          <label className="mt-4">Diagnosis</label>
          <textarea className="w-full h-20 p-2 border rounded" />
        </div>

        {/* Right column: RX + advices etc */}
        <aside className="bg-white p-4 rounded-lg shadow space-y-3">
          <label>Rx</label>
          <textarea className="w-full h-24 p-2 border rounded" />
          <label>Advice</label>
          <textarea className="w-full h-20 p-2 border rounded" />
          <label>Follow-Up</label>
          <input className="w-full p-2 border rounded" />
          <label>Referred To</label>
          <input className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <button className="btn">Save</button>
            <button className="btn">Print</button>
          </div>
        </aside>
      </div>

      {/* Suggestion sidebar would be implemented as a sliding panel component */}
    </div>
  );
}
