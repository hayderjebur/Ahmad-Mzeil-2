import express from 'express';
const router = express.Router();

import { getGallery } from '../controllers/galleryController.js';

router.route('/').get(getGallery);

export default router;
