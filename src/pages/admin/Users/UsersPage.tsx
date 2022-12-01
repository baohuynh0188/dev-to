import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userApi from '../../../api/userApi';
import StatusBage from '../../../components/admin/StatusBage';
import AdminLayout from '../../../components/layouts/AdminLayout';
import IUser from '../../../interfaces/auth.interface';
import { convertDate } from '../../../utilities/stringUtils';

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userStatus, setUserStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await userApi.getUsers({ status: userStatus });
        setUsers(responseUsers.data);
      } catch (error) {}
    };
    fetchData();
  }, [userStatus]);

  const onDeleteUserHandler = async (userId: string) => {
    if (!window.confirm('Are you sure delete this user?')) {
      return;
    }
    try {
      await userApi.deleteUserById(userId);
      setUsers((prevState) =>
        prevState.filter((item) => item.nhan_vien_id !== userId)
      );
      alert('Success');
    } catch (error) {
      alert(error);
    }
  };

  const renderTableBody = users.map((user) => {
    const {
      nhan_vien_id,
      anh_dai_dien,
      ten_nhan_vien,
      ten_tai_khoan,
      ngay_sinh,
      trang_thai,
      nhom_nhan_vien,
      ngay_tao,
    } = user;
    const avatarSrc = !!anh_dai_dien
      ? `${process.env.REACT_APP_URL_API}${anh_dai_dien}`
      : require('../../../assets/img/user-avatar.png');

    return (
      <tr key={nhan_vien_id}>
        <td className='col-1'>
          <Image className='img-thumbnail' src={avatarSrc} />
        </td>
        <td className='col-1'>
          <Link to={`edit/${nhan_vien_id}`}>{ten_nhan_vien}</Link>
        </td>
        <td className='col-1'>{ten_tai_khoan}</td>
        <td className='col-2'>{convertDate(ngay_sinh)}</td>
        <td className='col-1'>{nhom_nhan_vien.ten_nhom}</td>
        <td className='col-2'>{convertDate(ngay_tao)}</td>
        <td className='col-1'>
          <StatusBage status={trang_thai} />
        </td>
        <td className='col-1'>
          <div className='d-inline'>
            <Button
              variant='danger'
              size='sm'
              onClick={() => onDeleteUserHandler(nhan_vien_id)}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <AdminLayout title='Users'>
      <Row className='mb-3'>
        <Col>
          <div className='float-end'>
            <Form.Select
              onChange={(event) => setUserStatus(event.target.value)}
              value={userStatus}
            >
              <option value=''>Status</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='card mb-4'>
            <div className='card-body'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>DOB</th>
                    <th>Role</th>
                    <th>Create Date</th>
                    <th>Types</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{renderTableBody}</tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default UsersPage;
