import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserState } from "../context/UserProvider";

const AdminDashboard = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [newPosition, setNewPosition] = useState(0);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPosition, setEditedPosition] = useState(0);
  const { token } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/home'); // Redirect to home page if not an admin
    }
    if (token) {
      fetchData();
    } else {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:8000/admin/waitlist', config);
      setWaitlist(response.data);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    }
  };

  const addWaitlistEntry = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://localhost:8000/admin/waitlist', {
        email: newEmail,
        position: newPosition,
      }, config);
      setWaitlist([...waitlist, response.data]);
      setNewEmail('');
      setNewPosition(0);
    } catch (error) {
      console.error('Error adding waitlist entry:', error);
    }
  };

  const deleteWaitlistEntry = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:8000/admin/waitlist/${id}`, config);
      setWaitlist(waitlist.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error('Error deleting waitlist entry:', error);
    }
  };

  const startEditWaitlistEntry = (entry) => {
    setEditingEntry(entry);
    setEditedEmail(entry.email);
    setEditedPosition(entry.position);
  };

  const saveEditWaitlistEntry = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`http://localhost:8000/admin/waitlist/${editingEntry._id}`, {
        email: editedEmail,
        position: editedPosition,
      }, config);
      const updatedWaitlist = waitlist.map((entry) =>
        entry._id === editingEntry._id ? response.data : entry
      );
      setWaitlist(updatedWaitlist);
      setEditingEntry(null);
      setEditedEmail('');
      setEditedPosition(0);
    } catch (error) {
      console.error('Error editing waitlist entry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('signedJWT');
    localStorage.removeItem('isAdmin');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h3>Waitlist Entries:</h3>
      <ul>
        {waitlist.map((entry) => (
          <li key={entry._id}>
            {entry.email} - Position: {entry.position}
            <button onClick={() => startEditWaitlistEntry(entry)}>Edit</button>
            <button onClick={() => deleteWaitlistEntry(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingEntry && (
        <div>
          <h3>Edit Entry:</h3>
          <input
            type="text"
            placeholder="Email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Position"
            value={editedPosition}
            onChange={(e) => setEditedPosition(parseInt(e.target.value))}
          />
          <button onClick={saveEditWaitlistEntry}>Save Changes</button>
          <button onClick={() => setEditingEntry(null)}>Cancel</button>
        </div>
      )}

      <h3>Add New Entry:</h3>
      <input
        type="text"
        placeholder="Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Position"
        value={newPosition}
        onChange={(e) => setNewPosition(parseInt(e.target.value))}
      />
      <button onClick={addWaitlistEntry}>Add Entry</button>
    </div>
  );
};

export default AdminDashboard;
