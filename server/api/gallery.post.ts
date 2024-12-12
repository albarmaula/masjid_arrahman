import { defineEventHandler, readMultipartFormData } from 'h3';
import pool from '../db';  // MySQL pool

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);

        const caption = formData.find(field => field.name === 'caption')?.data.toString();
        const date = formData.find(field => field.name === 'date')?.data.toString();
        const galleryFiles = formData.filter(field => field.name.startsWith('galleryImg['));

        if (!date || !caption || galleryFiles.length === 0) {
            return { statusCode: 400, message: 'Caption, at least one image, and date are required' };
        }

        // Log received data
        console.log('Received date:', date);
        console.log('Received caption:', caption);
        console.log('Received flyer files:', galleryFiles);

        const [galleryResult] = await pool.execute(
            'INSERT INTO gallery (caption, date) VALUES (?, ?)',
            [caption, date]
        );
        const galleryId = (galleryResult as any).insertId;

        // Insert multiple images
        const galleryImgInsertPromises = galleryFiles.map((galleryFile) => {
            return pool.execute(
                'INSERT INTO gallery_img (gallery_id, img) VALUES (?, ?)',
                [galleryId, galleryFile.data]  // Store image as BLOB
            );
        });

        await Promise.all(galleryImgInsertPromises);

        return { statusCode: 200, message: 'Gallery added successfully' };
    } catch (error) {
        console.error('Error adding activity:', error);
        return { statusCode: 500, message: 'An error occurred while adding the activity' };
    }
});