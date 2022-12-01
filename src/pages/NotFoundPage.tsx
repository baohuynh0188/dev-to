import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = (): JSX.Element => {
  return (
    <Container>
      <Row className='justify-content-center m-5'>
        <Col className='text-center' xl='12'>
          <span className='display-1 d-block'>404</span>
          <div className='mb-4 lead'>
            The page you are looking for was not found.
          </div>
          <Link to='/' className='btn btn-link'>
            Back to Home
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
