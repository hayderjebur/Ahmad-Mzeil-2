import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const SellingPageScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
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
          <Link to={`/page/${page - 1}`} className='btn btn-light'>
            Go Back
          </Link>

          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                <Product product={product} />
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

export default SellingPageScreen;
