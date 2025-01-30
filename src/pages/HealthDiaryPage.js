import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HealthDiaryPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    symptom: '',
    notes: '',
  });

  const navigate = useNavigate();

  // Load saved entries on mount
  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem('healthDiaryEntries')) || [];
    setEntries(savedEntries);
  }, []);

  // Update localStorage whenever 'entries' changes
  useEffect(() => {
    localStorage.setItem('healthDiaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.symptom) {
      setEntries([...entries, { ...newEntry, id: Date.now() }]);
      setNewEntry({ date: '', symptom: '', notes: '' });
    }
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#1e293b] flex justify-center items-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-black text-center">Virtual Health Diary</h1>

        {/* Return to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-[#10b981] text-white py-2 px-4 rounded-md w-full mb-4 hover:bg-[#059669] transition duration-300"
        >
          Return to Dashboard
        </button>

        {/* ENTRY FORM */}
        <div>
          {/* Date Field */}
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Symptom Field */}
          <label htmlFor="symptom" className="block text-gray-700 font-medium mb-2">Symptom</label>
          <input
            type="text"
            id="symptom"
            name="symptom"
            value={newEntry.symptom}
            onChange={handleInputChange}
            placeholder="Enter a symptom"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Notes Field */}
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={newEntry.notes}
            onChange={handleInputChange}
            placeholder="Any additional notes"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 h-32 resize-none"
          />

          {/* Add Entry Button */}
          <button
            onClick={handleAddEntry}
            className="bg-[#10b981] text-white py-2 px-4 rounded-md w-full hover:bg-[#059669] transition duration-300"
          >
            Add Entry
          </button>
        </div>

        {/* ENTRIES LIST */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-black mb-4">Diary Entries</h2>
          {entries.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-4 bg-white rounded-md p-4 mb-4 shadow-md">
              <div>
                <p><strong>Date:</strong> {entry.date}</p>
                <p><strong>Symptom:</strong> {entry.symptom}</p>
                <p><strong>Notes:</strong> {entry.notes}</p>
              </div>
              <button
                onClick={() => handleDeleteEntry(entry.id)}
                className="bg-red-600 text-white py-1 px-3 rounded-sm mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthDiaryPage;
