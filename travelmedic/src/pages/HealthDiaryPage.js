// src/pages/HealthDiaryPage.js
import React, { useState, useEffect } from 'react';
import './HealthDiaryPage.css';

function HealthDiaryPage() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    symptom: '',
    notes: ''
  });

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
    <div className="health-diary-page">
      <h1 className="title">Virtual Health Diary</h1>
      <div className="entry-form">
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
        <button onClick={handleAddEntry} className="add-button">Add Entry</button>
      </div>

      <div className="entry-list">
        <h2 className="subtitle">Diary Entries</h2>
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <div className="entry-details">
              <strong>Date:</strong> {entry.date}<br />
              <strong>Symptom:</strong> {entry.symptom}<br />
              <strong>Notes:</strong> {entry.notes}
            </div>
            <button onClick={() => handleDeleteEntry(entry.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthDiaryPage;
