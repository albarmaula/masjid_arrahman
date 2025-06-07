import { defineEventHandler } from 'h3';
import pool from '../db';  // MySQL pool

export default defineEventHandler(async (event) => {
    try {
        const [galleryRows] = await pool.query('SELECT * FROM gallery ORDER BY date DESC');
        const galleryItems = await Promise.all(galleryRows.map(async (gallery) => {
            // Get image paths from gallery_img table
            const [imgRows] = await pool.query('SELECT img FROM gallery_img WHERE gallery_id = ?', [gallery.id]);
            // No need to convert to base64, just use the stored paths
            const images = imgRows.map(imgRow => imgRow.img);
            
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