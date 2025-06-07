import { defineEventHandler, readMultipartFormData } from 'h3';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import pool from '../db';

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);
        const uploadDir = '/home/masj2582/public_html/uploads/gallery';

        const caption = formData.find(field => field.name === 'caption')?.data.toString();
        const date = formData.find(field => field.name === 'date')?.data.toString();
        const galleryFiles = formData.filter(field => field.name.startsWith('galleryImg['));

        if (!date || !caption || galleryFiles.length === 0) {
            return { statusCode: 400, message: 'Caption, at least one image, and date are required' };
        }

        // Insert gallery data
        const [galleryResult] = await pool.execute(
            'INSERT INTO gallery (caption, date) VALUES (?, ?)',
            [caption, date]
        );
        const galleryId = (galleryResult as any).insertId;

        // Save gallery images
        const galleryImgInsertPromises = galleryFiles.map(async (galleryFile, index) => {
            // Create unique filename
            const fileName = `gallery_${galleryId}_${index}_${Date.now()}_${galleryFile.filename}`;
            const filePath = join(uploadDir, fileName);

            // Save file to disk
            await writeFile(filePath, galleryFile.data);

            // Store file path in database
            return pool.execute(
                'INSERT INTO gallery_img (gallery_id, img) VALUES (?, ?)',
                [galleryId, `/uploads/gallery/${fileName}`]
            );
        });

        await Promise.all(galleryImgInsertPromises);

        return { statusCode: 200, message: 'Gallery added successfully' };
    } catch (error) {
        console.error('Error adding gallery:', error);
        return { statusCode: 500, message: 'An error occurred while adding the gallery' };
    }
});