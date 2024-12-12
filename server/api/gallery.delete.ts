import { defineEventHandler, readBody } from 'h3';
import pool from '../db';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { id } = body;
    if (!id) {
      return {
        statusCode: 400,
        message: 'ID gallery is required',
      };
    }

    const [result] = await pool.query('DELETE FROM gallery WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return {
        statusCode: 404,
        message: 'Gallery not found',
      };
    }

    return {
      statusCode: 200,
      message: 'Gallery deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting Gallery:', error);
    return {
      statusCode: 500,
      message: 'An error occurred while deleting the Gallery',
    };
  }
});
