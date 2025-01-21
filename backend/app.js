require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Required to serve static files
const { sequelize } = require('./models'); // Import Sequelize instance from index.js

const app = express();

// Debug: Verify environment variables
console.log('Environment Variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****' : 'Not Set'); // Mask password for security
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes for API endpoints
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

// API Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Serve static files from the React app
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Catch-all handler for React routes (only serve React for non-API routes)
app.get('*', (req, res) => {
  const requestPath = req.url;
  if (requestPath.startsWith('/auth') || requestPath.startsWith('/items')) {
    res.status(404).send('Not Found'); // Prevent React from intercepting API routes
  } else {
    console.log(`Serving React for route: ${req.url}`);
    res.sendFile(path.join(frontendPath, 'index.html'));
  }
});

// Test database connection before syncing
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful!');
    return sequelize.sync(); // Sync database models
  })
  .then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    console.error(err);
    process.exit(1); // Exit process if database connection fails
  });

module.exports = app;
