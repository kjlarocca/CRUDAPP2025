import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Your Inventory</h1>
      {/* Link to AddOrEditItemPage for adding new items */}
      <Link to="/create-item">Add New Item</Link>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.itemName}: {item.description} (Quantity: {item.quantity})
            {/* Link to AddOrEditItemPage for editing the item */}
            <Link to={`/edit-item/${item.id}`} style={{ marginLeft: '10px' }}>
              Edit
            </Link>
            {/* Link to view item details */}
            <Link to={`/item/${item.id}`} style={{ marginLeft: '10px' }}>
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryPage;
