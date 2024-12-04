import { defineEventHandler, readMultipartFormData } from 'h3';
import pool from '../db';  // MySQL pool

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);

        const agendaFile = formData.find(field => field.name === 'agenda');
        const date = formData.find(field => field.name === 'date')?.data.toString();
        const flyerFiles = formData.filter(field => field.name.startsWith('flyer['));

        if (!date || !agendaFile || flyerFiles.length === 0) {
            return { statusCode: 400, message: 'Agenda, at least one flyer, and date are required' };
        }

        // Log received data
        console.log('Received date:', date);
        console.log('Received agenda file:', agendaFile);
        console.log('Received flyer files:', flyerFiles);

        // Insert activity into 'activities' table
        const [activityResult] = await pool.execute(
            'INSERT INTO activities (agenda, date) VALUES (?, ?)',
            [agendaFile.data, date] // Store agenda image as BLOB
        );
        const activityId = (activityResult as any).insertId;

        // Insert multiple flyer images related to the activity
        const flyerInsertPromises = flyerFiles.map((flyerFile) => {
            return pool.execute(
                'INSERT INTO activities_flyers (activity_id, img) VALUES (?, ?)',
                [activityId, flyerFile.data]  // Store flyer image as BLOB
            );
        });

        await Promise.all(flyerInsertPromises);

        return { statusCode: 200, message: 'Activity added successfully' };
    } catch (error) {
        console.error('Error adding activity:', error);
        return { statusCode: 500, message: 'An error occurred while adding the activity' };
    }
});