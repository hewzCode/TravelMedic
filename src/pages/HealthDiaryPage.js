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

  // ===========
  //   STYLES
  // ===========
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #7f5af0, #2a2a72)',
    padding: '1rem',
  };

  const containerStyle = {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#7f5af0',
  };

  const buttonBlueStyle = {
    backgroundColor: '#1e3a8a',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    border: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#4b4b4b',
  };

  const inputFieldStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #ddd',
    marginBottom: '1rem',
    fontSize: '1rem',
    outline: 'none',
  };

  const inputFieldFocusStyle = {
    boxShadow: '0 0 5px rgba(127, 90, 240, 0.3)',
    borderColor: '#7f5af0',
  };

  const addButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: '#7f5af0',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
  };

  const diaryTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#7f5af0',
    marginBottom: '1rem',
  };

  const entryItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  };

  const deleteButtonStyle = {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '0.4rem 0.8rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    border: 'none',
    marginTop: '0.5rem',
    alignSelf: 'flex-start',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Virtual Health Diary</h1>

        {/* Return to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={buttonBlueStyle}
        >
          Return to Dashboard
        </button>

        {/* ENTRY FORM */}
        <div>
          {/* Date Field */}
          <label htmlFor="date" style={labelStyle}>
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            style={inputFieldStyle}
            onFocus={(e) => (e.target.style = { ...inputFieldStyle, ...inputFieldFocusStyle })}
            onBlur={(e) => (e.target.style = inputFieldStyle)}
          />

          {/* Symptom Field */}
          <label htmlFor="symptom" style={labelStyle}>
            Symptom
          </label>
          <input
            type="text"
            id="symptom"
            name="symptom"
            value={newEntry.symptom}
            onChange={handleInputChange}
            placeholder="Enter a symptom"
            style={inputFieldStyle}
            onFocus={(e) => (e.target.style = { ...inputFieldStyle, ...inputFieldFocusStyle })}
            onBlur={(e) => (e.target.style = inputFieldStyle)}
          />

          {/* Notes Field */}
          <label htmlFor="notes" style={labelStyle}>
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={newEntry.notes}
            onChange={handleInputChange}
            placeholder="Any additional notes"
            style={{ ...inputFieldStyle, height: '100px', resize: 'vertical' }}
            onFocus={(e) =>
              (e.target.style = { ...inputFieldStyle, ...inputFieldFocusStyle, height: '100px', resize: 'vertical' })
            }
            onBlur={(e) =>
              (e.target.style = { ...inputFieldStyle, height: '100px', resize: 'vertical' })
            }
          />

          {/* Add Entry Button */}
          <button onClick={handleAddEntry} style={addButtonStyle}>
            Add Entry
          </button>
        </div>

        {/* ENTRIES LIST */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={diaryTitleStyle}>Diary Entries</h2>
          {entries.map((entry) => (
            <div key={entry.id} style={entryItemStyle}>
              <div>
                <p>
                  <strong>Date:</strong> {entry.date}
                </p>
                <p>
                  <strong>Symptom:</strong> {entry.symptom}
                </p>
                <p>
                  <strong>Notes:</strong> {entry.notes}
                </p>
              </div>
              <button
                onClick={() => handleDeleteEntry(entry.id)}
                style={deleteButtonStyle}
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
