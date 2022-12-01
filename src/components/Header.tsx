import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/Header.css';
interface IHeader {
  title: string;
  subHeading?: string;
  backgroundImage?: string;
}

const Header = ({
  title,
  subHeading,
  backgroundImage,
}: IHeader): JSX.Element => {
  const backgroundImageURL = !!backgroundImage
    ? `url(${backgroundImage})`
    : `url(${require('../assets/img/contact-bg.jpg')})`;

  return (
    <header style={{ backgroundImage: backgroundImageURL }}>
      <Container className='position-relative'>
        <Row className='justify-content-center'>
          <Col md='10' lg='8' xl='7'>
            <div className='text-center text-light'>
              <h2 className='fw-bold'>{title}</h2>
              {subHeading ?? <span className='subheading'>{subHeading}</span>}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
