import { defineEventHandler, getQuery } from 'h3';
import pool from '../../db'; // MySQL pool

export default defineEventHandler(async (event) => {
    try {
        // Mendapatkan ID dari parameter URL
        const { id } = event.context.params;

        // Ambil data galeri berdasarkan ID
        const [galleryRows] = await pool.query('SELECT * FROM gallery WHERE id = ?', [id]);

        // Jika galeri tidak ditemukan
        if (galleryRows.length === 0) {
            return {
                statusCode: 404,
                message: 'Gallery item not found'
            };
        }

        // Ambil detail galeri
        const gallery = galleryRows[0];

        // Ambil gambar terkait dari tabel gallery_img
        const [imgRows] = await pool.query('SELECT img FROM gallery_img WHERE gallery_id = ?', [id]);
        const images = imgRows.map(imgRow => imgRow.img.toString('base64'));

        // Susun respons
        return {
            statusCode: 200,
            data: {
                id: gallery.id,
                caption: gallery.caption,
                date: gallery.date,
                images
            }
        };
    } catch (error) {
        console.error('Error fetching gallery item:', error);
        return {
            statusCode: 500,
            message: 'An error occurred while fetching gallery item'
        };
    }
});