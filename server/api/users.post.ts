import { defineEventHandler, readBody, createError } from 'h3';
import pool from '../db';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { password, email } = body;

    if (!password || !email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password and Email are required',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO users (password, email) VALUES (?, ?)',
      [password, email]
    );

    // Kembalikan respons
    return {
      success: true,
      message: 'User created successfully',
      userId: result.insertId,
    };
  } catch (error) {
    console.error('Error during user creation:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user',
    });
  }
});
