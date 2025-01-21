const express = require('express');
const jwt = require('jsonwebtoken');
const { Item } = require('../models');

const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.userId = decoded.id; // Attach userId to the request
    next();
  });
};

// Create a new item
router.post('/', authenticate, async (req, res) => {
  const { itemName, description, quantity } = req.body;

  try {
    const newItem = await Item.create({
      userId: req.userId,
      itemName,
      description,
      quantity,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { userId: req.userId },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single item by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an item
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, description, quantity } = req.body;

    // Find the item and ensure it belongs to the logged-in user
    const item = await Item.findOne({ where: { id, userId: req.userId } });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update the item with new details
    await item.update({ itemName, description, quantity });
    res.json(item); // Respond with the updated item
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an item
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the item and ensure it belongs to the logged-in user
    const item = await Item.findOne({ where: { id, userId: req.userId } });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Delete the item
    await item.destroy();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
