import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch all items from the backend
    axios.get(`${process.env.REACT_APP_API_URL}/items`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>
              {item.itemName}: {item.description.slice(0, 100)}{item.description.length > 100 && '...'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
