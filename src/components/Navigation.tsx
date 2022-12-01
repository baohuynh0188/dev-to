import React, { useEffect, useState } from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { navBar } from '../data/navBarItems';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { logout } from '../redux/slices/authSlice';
import LoginModal from './Modals/LoginModal';

const Navigation = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<'Sign In' | 'Sign Up'>(
    'Sign In'
  );

  const onSignInClick = () => {
    setShowModal(true);
    setModalTitle('Sign In');
  };

  const onSignUpClick = () => {
    setShowModal(true);
    setModalTitle('Sign Up');
  };

  const onCloseModal = (): void => {
    setShowModal(false);
  };

  const onLogoutClick = (): void => {
    localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {}, [isLogin]);

  return (
    <Nav className='navbar navbar-expand-lg navbar-light' id='mainNav'>
      <LoginModal title={modalTitle} show={showModal} onClose={onCloseModal} />
      <Container className='px-4 px-lg-5'>
        <Link className='navbar-brand' to='/'>
          Dev.to
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          Menu
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav ms-auto py-4 py-lg-0'>
            {navBar.map((item) => {
              return (
                <li className='nav-item' key={item.title}>
                  <Link
                    className='nav-link px-lg-3 py-3 py-lg-4'
                    to={item.href}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          {!isLogin ? (
            <div>
              <Button
                variant='light'
                className='mx-lg-3'
                onClick={onSignInClick}
              >
                Sign in
              </Button>
              <Button variant='success' onClick={onSignUpClick}>
                Sign up
              </Button>
            </div>
          ) : (
            <>
              <Link className='nav-link px-lg-3 py-3 py-lg-4' to='/profile'>
                Profile
              </Link>
              <Button variant='danger' onClick={onLogoutClick}>
                Log out
              </Button>
            </>
          )}
        </div>
      </Container>
    </Nav>
  );
};

export default Navigation;
