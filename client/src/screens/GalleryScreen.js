import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Image, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

import { uploadImage, listGallary } from '../actions/uploadImage';

const GalleryScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const galleryList = useSelector((state) => state.galleryList);
  const { loading, error, gallery, page, pages } = galleryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listGallary(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>

          {userInfo && userInfo.isAdmin && (
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Control type='file' onChange={uploadImage} />
            </Form.Group>
          )}

          <Row style={{ margin: '2rem' }}>
            {gallery.map((painting) => (
              <Col key={painting._id} sm={12} md={6} lg={4} xl={4}>
                <Image
                  style={{ margin: '0.5rem' }}
                  src={painting.image.url}
                  thumbnail
                />
              </Col>
            ))}
          </Row>

          <div style={{ marginLeft: '3rem' }}>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default GalleryScreen;
