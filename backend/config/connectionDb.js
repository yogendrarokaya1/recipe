const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,          // Your DB username from .env
    host: process.env.DB_HOST,          // Host from .env
    database: process.env.DB_NAME,      // Database name from .env
    password: process.env.DB_PASS,      // DB password from .env
    port: process.env.DB_PORT,          // Port (5432 for PostgreSQL)
});

pool.connect()
    .then(() => console.log("Connected to the  database"))
    .catch((err) => console.error("Database connection error", err.stack));

module.exports = pool;
