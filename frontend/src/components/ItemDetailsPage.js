import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ItemDetailPage() {
  const { id } = useParams(); // Get item ID from the URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Toggle for edit mode
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItem(response.data);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to load item details.');
      }
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditMode(false); // Exit edit mode after saving
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Failed to save changes.');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/inventory'); // Redirect to inventory after deletion
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete the item.');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <div>
      <h1>Item Details</h1>
      {isEditMode ? (
        <div>
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="itemName"
              value={item.itemName}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            <strong>Description:</strong>
            <textarea
              name="description"
              value={item.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            <strong>Quantity:</strong>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {item.itemName}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <button onClick={() => setIsEditMode(true)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
            Delete
          </button>
          <button onClick={() => navigate('/inventory')} style={{ marginLeft: '10px' }}>
            Back to Inventory
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemDetailPage;
