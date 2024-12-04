import { defineEventHandler, createError } from 'h3';
import pool from '../db';

export default defineEventHandler(async (event) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
