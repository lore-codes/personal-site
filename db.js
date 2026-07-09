const useSSL = process.env.USE_SSL === "true";
const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;