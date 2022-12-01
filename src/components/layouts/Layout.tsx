import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header';
import Navigation from '../Navigation';

interface ILayout {
  children: React.ReactNode;
  title: string;
  subHeading?: string;
  backgroundImage?: string;
}

const Layout = ({
  children,
  title,
  subHeading,
  backgroundImage,
}: ILayout): JSX.Element => {
  return (
    <Fragment>
      <Navigation />
      <Container>
        <Header
          title={title}
          subHeading={subHeading}
          backgroundImage={backgroundImage}
        />
        {children}
      </Container>
    </Fragment>
  );
};

export default Layout;
