import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
  return (
    <Row>
      <Col sm={12} md={12} lg={6} xl={6}>
        {/* <Col className='p-0'> */}
        <Image src='/images/ahmad.jpeg' className='hero' />
        {/* </Col> */}
      </Col>
      <Col sm={12} md={12} lg={6} xl={6} className='flex p2'>
        <h1>
          <span className='textGreenColor'>Ahmad</span>
          <span className='dancingFont'>Mzeil</span>
        </h1>
        <p className='fontStyle'>
          Born in Baghdad, Iraq in 1971, Ahmad Mzeil has exhibited consistently
          for the past twelve years both nationally and internationally and he
          had two solo shows one in Baghdad and the other in Detroit MI. Ahmad
          has earned recognition letter from the queen of Sweden. Now he lives
          and paint in Dearborn MI.
        </p>
        <div className='flexJustify'>
          <div className='icon'>
            <a
              href='https://www.facebook.com/ahmad.mzeil.31'
              target='_blank'
              rel='noreferrer'
            >
              <i class='fab fa-facebook fa-3x '></i>
            </a>
          </div>
          <div className='icon'>
            <a
              href='mailto:ahmadmzeil71@gmail.com'
              target='_blank'
              rel='noreferrer'
            >
              <i class='fab fa-google-plus fa-3x '></i>
            </a>
          </div>
          <div className='icon'>
            <i class='fab fa-instagram fa-3x'></i>
          </div>
        </div>
        <Link to={`/page/1`}>
          {' '}
          <button size='lg' className='greenBtn'>
            Gallery
          </button>
        </Link>
      </Col>
    </Row>
  );
};

export default LandingPage;
