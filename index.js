require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3010;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('static'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Serve Static Files
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Import Routes
const menuRoutes = require('./routes/menuRoutes');
app.use('/api', menuRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
