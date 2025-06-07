import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost",
  // password: "PCNgL3wF3Ob.",
  // user: "masj2582_admin",
  password: "PCNgL3wF3Ob.",
  user: "masj2582_admin",
  database: "masj2582_masjid_ar_rahman",
  ssl: false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).on('error', (err) => {
  console.error('Database connection error:', err);
});

// Verify connection
const verifyConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
};

verifyConnection();

export default pool;