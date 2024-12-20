// src/pages/HealthDiaryPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthDiaryPage.css';

function HealthDiaryPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    symptom: '',
    notes: ''
  });
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('healthDiaryEntries')) || [];
    setEntries(savedEntries);
  }, []);

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
    <div className="health-diary-page bg-gradient">
      <div className="container bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h1 className="title text-3xl font-bold mb-4 text-center text-purple-700">Virtual Health Diary</h1>
        
        {/* Return to Dashboard Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="dashboard-button bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mb-6"
        >
          Return to Dashboard
        </button>

        <div className="entry-form space-y-4">
          <input
            type="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="symptom"
            value={newEntry.symptom}
            onChange={handleInputChange}
            placeholder="Symptom"
            className="input-field"
          />
          <textarea
            name="notes"
            value={newEntry.notes}
            onChange={handleInputChange}
            placeholder="Additional notes"
            className="input-field textarea"
          />
          <button onClick={handleAddEntry} className="add-button bg-purple-600 hover:bg-purple-700">
            Add Entry
          </button>
        </div>

        <div className="entry-list mt-8">
          <h2 className="subtitle text-xl font-semibold text-purple-700 mb-4">Diary Entries</h2>
          {entries.map((entry) => (
            <div key={entry.id} className="entry-item flex justify-between items-start bg-white p-4 rounded-md shadow-md mb-4">
              <div className="entry-details">
                <p><strong>Date:</strong> {entry.date}</p>
                <p><strong>Symptom:</strong> {entry.symptom}</p>
                <p><strong>Notes:</strong> {entry.notes}</p>
              </div>
              <button onClick={() => handleDeleteEntry(entry.id)} className="delete-button">
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
