import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className='mb-2 p-2 rounded' style={{ height: '35rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          {/* <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title> */}
        </Link>
        <Card.Text as='div'>
          {
            product.countInStock === 0 ? 'Coming soon' : ''
            // <Card.Text as='h3'>${product.price}</Card.Text>
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
