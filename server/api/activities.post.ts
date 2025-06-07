import { defineEventHandler, readMultipartFormData } from 'h3';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import pool from '../db';

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);
        const uploadDir = '/home/masj2582/public_html/uploads/activities';

        const agendaFile = formData.find(field => field.name === 'agenda');
        const date = formData.find(field => field.name === 'date')?.data.toString();
        const flyerFiles = formData.filter(field => field.name.startsWith('flyer['));

        if (!date || !agendaFile || flyerFiles.length === 0) {
            return { statusCode: 400, message: 'Agenda, at least one flyer, and date are required' };
        }

        // Save agenda image
        const agendaFileName = `agenda_${Date.now()}_${agendaFile.filename}`;
        const agendaPath = join(uploadDir, agendaFileName);
        await writeFile(agendaPath, agendaFile.data);

        // Insert activity with image path instead of BLOB
        const [activityResult] = await pool.execute(
            'INSERT INTO activities (agenda, date) VALUES (?, ?)',
            [`/uploads/activities/${agendaFileName}`, date]
        );
        const activityId = (activityResult as any).insertId;

        // Save flyer images
        const flyerInsertPromises = flyerFiles.map(async (flyerFile, index) => {
            const flyerFileName = `flyer_${activityId}_${index}_${Date.now()}_${flyerFile.filename}`;
            const flyerPath = join(uploadDir, flyerFileName);
            await writeFile(flyerPath, flyerFile.data);

            return pool.execute(
                'INSERT INTO activities_flyers (activity_id, img) VALUES (?, ?)',
                [activityId, `/uploads/activities/${flyerFileName}`]
            );
        });

        await Promise.all(flyerInsertPromises);

        return { statusCode: 200, message: 'Activity added successfully' };
    } catch (error) {
        console.error('Error adding activity:', error);
        return { statusCode: 500, message: 'An error occurred while adding the activity' };
    }
});