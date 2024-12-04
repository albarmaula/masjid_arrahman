import { defineEventHandler } from 'h3';
import pool from '../db';  // MySQL pool

export default defineEventHandler(async (event) => {
  try {
    // Query to get all activities sorted by date in descending order
    const [activities] = await pool.query('SELECT id, date, agenda FROM activities ORDER BY date DESC');
    console.log('Activities:', activities);

    // Query to get all flyers
    const [flyers] = await pool.query('SELECT activity_id, img FROM activities_flyers');
    console.log('Flyers:', flyers);

    // Map flyers to their respective activities
    const activitiesWithFlyers = activities.map((activity: any) => {
      return {
        ...activity,
        agenda: activity.agenda ? activity.agenda.toString('base64') : null,
        flyers: flyers
          .filter((flyer: any) => flyer.activity_id === activity.id)
          .map((flyer: any) => ({
            ...flyer,
            img: flyer.img.toString('base64')
          }))
      };
    });

    console.log('Activities with Flyers:', activitiesWithFlyers);

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