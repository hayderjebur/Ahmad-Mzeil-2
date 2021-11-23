import Painting from '../models/paintingModel.js';
import asyncHandler from 'express-async-handler';

// @desc   Upload Img
// @route   POST /api/upload
// @access  Private
export const uploadImg = asyncHandler(async (req, res) => {
  const { url, publicId } = req.body.image;

  const painting = new Painting({
    image: {
      url,
      publicId,
    },
  });

  const createdPainting = await painting.save();
  res.status(201).json(createdPainting);
});
