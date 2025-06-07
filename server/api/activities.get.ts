import { defineEventHandler } from 'h3';
import pool from '../db';

export default defineEventHandler(async (event) => {
  try {
    // Query to get all activities sorted by date in descending order
    const [activities] = await pool.query('SELECT id, date, agenda FROM activities ORDER BY date DESC');

    // Query to get all flyers
    const [flyers] = await pool.query('SELECT activity_id, img FROM activities_flyers');

    // Map flyers to their respective activities
    const activitiesWithFlyers = activities.map((activity: any) => {
      return {
        ...activity,
        // No need to convert to base64 since we're storing paths now
        agenda: activity.agenda || null,
        flyers: flyers
          .filter((flyer: any) => flyer.activity_id === activity.id)
          .map((flyer: any) => ({
            ...flyer,
            // No need to convert to base64 since we're storing paths now
            img: flyer.img
          }))
      };
    });

    return {
      statusCode: 200,
      data: activitiesWithFlyers
    };
  } catch (error) {
    console.error('Error fetching activities:', error);
    return {
      statusCode: 500,
      message: 'An error occurred while fetching the activities'
    };
  }
});