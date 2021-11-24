import Painting from '../models/paintingModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc   Upload Img
// @route   POST /api/upload
// @access  Private
export const uploadImg = asyncHandler(async (req, res) => {
  const { url, publicId } = req.body.image;
  if (req.body.name && req.body.price) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: {
        url,
        publicId,
      },
      description: req.body.description,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    const painting = new Painting({
      image: {
        url,
        publicId,
      },
    });

    const createdPainting = await painting.save();
    res.status(201).json(createdPainting);
  }
});
