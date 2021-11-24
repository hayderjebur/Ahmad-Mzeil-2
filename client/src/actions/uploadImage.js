import axios from 'axios';
import {
  GALLERY_LIST_FAIL,
  GALLERY_LIST_REQUEST,
  GALLERY_LIST_SUCCESS,
} from '../constants/gallaryConstants';

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/ahmad-mzeil/image/upload';

export const uploadImage = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Ahmad-Mzeil');

  const fetchOptions = {
    method: 'POST',
    body: formData,
  };

  const image = await fetch(CLOUDINARY_URL, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));

  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image }),
  };

  return await fetch('/api/upload', postOptions)
    .then((res) => res.json())

    .catch(() => ({
      error: {
        message: 'Unable to save the image in database. Please try again',
      },
    }));
};

export const listGallary =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: GALLERY_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/gallery?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: GALLERY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GALLERY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
