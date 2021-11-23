import Painting from '../models/paintingModel.js';
import asyncHandler from 'express-async-handler';

// @desc   Gallery list
// @route   GET /api/gallery
// @access  Public
export const getGallery = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Painting.countDocuments({ ...keyword });
  const gallery = await Painting.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    gallery,
    page,
    pages: Math.ceil(count / pageSize),
  });
});
