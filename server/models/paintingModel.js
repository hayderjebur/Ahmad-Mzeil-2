import mongoose from 'mongoose';

const paintingModel = mongoose.Schema({
  image: {
    url: { type: String },
    publicId: { type: String },
  },
});

const Painting = mongoose.model('Painting', paintingModel);

export default Painting;
