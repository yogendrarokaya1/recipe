const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const pool = require('./config/connectionDb');
const recipeRoutes = require ('./routes/recipeRoutes') 
require('dotenv').config();

const app = express();



app.use(express.json());
app.use(cors());
// Use the routes for the API
app.use('/api/', userRoutes);  // Mount user routes at /api/users
app.use('/api/recipes', recipeRoutes);  // Recipe routes
// Test PostgreSQL connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Error connecting to PostgreSQL:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
