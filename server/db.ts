import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1', // MySQL host
  user: process.env.DB_USER || 'root',     // MySQL user
  password: process.env.DB_PASS || '3521211',     // MySQL password
  database: process.env.DB_NAME || 'masjid_ar_rahman', // MySQL database
});

export default pool;
