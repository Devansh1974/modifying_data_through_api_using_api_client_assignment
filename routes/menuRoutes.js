const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// ✅ POST /api/menu → Add new menu item
router.post('/menu', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: "Name and Price are required!" });
        }

        const newItem = new MenuItem({ name, description, price });
        await newItem.save();
        res.status(201).json({ message: "Menu item added successfully", newItem });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET /api/menu → Fetch all menu items
router.get('/menu', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
