import { defineEventHandler } from 'h3';
import pool from '../db';  // MySQL pool

export default defineEventHandler(async (event) => {
    try {
        const [galleryRows] = await pool.query('SELECT * FROM gallery ORDER BY date DESC');
        const galleryItems = await Promise.all(galleryRows.map(async (gallery) => {
            const [imgRows] = await pool.query('SELECT img FROM gallery_img WHERE gallery_id = ?', [gallery.id]);
            const images = imgRows.map(imgRow => imgRow.img.toString('base64'));
            return {
                id: gallery.id,
                caption: gallery.caption,
                date: gallery.date,
                images
            };
        }));

        return {
            statusCode: 200,
            data: galleryItems
        };
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        return {
            statusCode: 500,
            message: 'An error occurred while fetching gallery items'
        };
    }
});