import {
  GALLERY_LIST_FAIL,
  GALLERY_LIST_REQUEST,
  GALLERY_LIST_SUCCESS,
} from '../constants/gallaryConstants';

export const galleryListReducer = (state = { gallery: [] }, action) => {
  switch (action.type) {
    case GALLERY_LIST_REQUEST:
      return { loading: true, gallery: [] };
    case GALLERY_LIST_SUCCESS:
      return {
        loading: false,
        gallery: action.payload.gallery,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case GALLERY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
