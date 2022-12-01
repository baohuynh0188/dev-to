import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import ChangePasswordModal from '../components/Modals/ChangePasswordModal';
import authApi from '../api/authApi';
import IUser from '../interfaces/auth.interface';
import Layout from '../components/layouts/Layout';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isLogin, userInfo } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<IUser | undefined>(userInfo);
  const {
    nhan_vien_id,
    ten_tai_khoan,
    email,
    gioi_tinh,
    dia_chi,
    ten_nhan_vien = '',
  } = user || {};

  useEffect(() => {
    if (!isLogin) {
      return navigate('/');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await authApi.getUserById(nhan_vien_id);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (nhan_vien_id) {
      fetchUserById();
    }
  }, [nhan_vien_id]);

  const onCloseModal = (): void => {
    setShowModal(false);
  };

  const onChangePasswordClick = () => {
    setShowModal(true);
  };

  return (
    <Layout title={ten_nhan_vien}>
      <ChangePasswordModal show={showModal} closeModalHandler={onCloseModal} />
      <h2>Profile</h2>
      <Row>
        <Col xl='6'>
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' value={ten_tai_khoan} disabled />
          </Form.Group>
        </Col>
        <Col xl='6'>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' value={email} disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xl='12'>
          <Form.Group className='mb-3' controlId='Gender'>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type='text'
              value={gioi_tinh === 1 ? 'Male' : 'Female'}
              disabled
            />
          </Form.Group>
        </Col>
        <Col xl='12'>
          <Form.Group className='mb-3' controlId='Address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' value={dia_chi} disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='warning' onClick={onChangePasswordClick}>
            Change Password
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfilePage;
