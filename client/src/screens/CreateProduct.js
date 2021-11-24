import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createProduct } from '../actions/productActions';
import { uploadImage } from '../actions/uploadImage';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} from '../constants/productConstants';
import Message from '../components/Message';

const CreateProduct = ({ history }) => {
  const [painting, setPainting] = useState({
    name: '',
    price: 0,
    image: {
      url: '',
      publicId: '',
    },
    description: '',
  });

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { success, error } = productCreate;

  const uploadImgHandler = useCallback(
    (e) => {
      setUploading(true);
      uploadImage(e)
        .then((data) => {
          setPainting({ ...painting, image: { ...data.image } });
        })
        .then(() => setUploading(false));
    },
    [painting]
  );

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push('/admin/productlist');
    }
  }, [dispatch, uploadImgHandler, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!painting.name || !painting.price || !painting.description) {
      dispatch({ type: PRODUCT_CREATE_FAIL });
      return;
    }

    dispatch(createProduct(painting));
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={painting.name}
              onChange={(e) =>
                setPainting({ ...painting, name: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={painting.price}
              onChange={(e) =>
                setPainting({ ...painting, price: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={painting.description}
              onChange={(e) =>
                setPainting({ ...painting, description: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>

            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadImgHandler}
            ></Form.File>
            {uploading && (
              <>
                <p>The image is uploading</p> <Loader />
              </>
            )}
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateProduct;
