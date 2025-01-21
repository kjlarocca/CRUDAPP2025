import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddOrEditItemPage() {
  const { id } = useParams(); // Get the item ID from the URL (if editing)
  const navigate = useNavigate();
  const [item, setItem] = useState({ itemName: '', description: '', quantity: 0 });
  const [error, setError] = useState('');

  // Fetch the item details if an ID is provided (edit mode)
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios
        .get(`${process.env.REACT_APP_API_URL}/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setItem(response.data))
        .catch((error) => {
          console.error('Error fetching item:', error);
          setError('Failed to load item details.');
        });
    }
  }, [id]);

  // Handle form submission for creating or updating items
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Determine the request type (POST for new items, PUT for updates)
    const method = id ? 'put' : 'post';
    const url = id
      ? `${process.env.REACT_APP_API_URL}/items/${id}` // Update existing item
      : `${process.env.REACT_APP_API_URL}/items`; // Create new item

    axios[method](url, item, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => navigate('/inventory')) // Redirect to inventory after success
      .catch((error) => {
        console.error('Error saving item:', error);
        setError('Failed to save the item. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{id ? 'Edit Item' : 'Add New Item'}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          Name:
          <input
            type="text"
            value={item.itemName}
            onChange={(e) => setItem({ ...item, itemName: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value, 10) || 0 })}
            required
          />
        </label>
        <br />
        <button type="submit">{id ? 'Update' : 'Create'} Item</button>
      </form>
    </div>
  );
}

export default AddOrEditItemPage;
