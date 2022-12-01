import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import postApi from '../../../api/postApi';
import StatusBage from '../../../components/admin/StatusBage';
import AdminLayout from '../../../components/layouts/AdminLayout';
import IPost from '../../../interfaces/post.interface';
import { convertDate } from '../../../utilities/stringUtils';

const PostsPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postStatus, setPostStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await postApi.getPosts({ status: postStatus });
        setPosts(responsePosts.data);
      } catch (error) {}
    };
    fetchData();
  }, [postStatus]);

  const onSwitchesHandler = async (switchId: string, postId: number) => {
    const currentPost = posts.find((item) => item.tin_tuc_id === postId);
    if (currentPost) {
      let updatedPost;
      try {
        switch (switchId) {
          case 'new':
            updatedPost = {
              ...currentPost,
              tin_moi: !currentPost.tin_moi,
            };
            break;
          case 'hot':
            updatedPost = {
              ...currentPost,
              tin_noi_bat: !currentPost.tin_noi_bat,
            };
            break;
          default:
            break;
        }
        await postApi.putPostById(postId, updatedPost);
        alert('Success');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onDeletePostHandler = async (postId: number) => {
    if (!window.confirm('Are you sure delete this item?')) {
      return;
    }
    try {
      await postApi.deletePostById(postId);
      setPosts((prevState) =>
        prevState.filter((item) => item.tin_tuc_id !== postId)
      );
      alert('Success');
    } catch (error) {
      alert(error);
    }
  };

  const renderTableBody = posts.map((post) => {
    const {
      tin_tuc_id,
      tieu_de,
      mo_ta,
      nguoi_tao,
      ngay_tao,
      ngay_sua,
      trang_thai,
      tin_moi,
      tin_noi_bat,
    } = post;
    return (
      <tr key={tin_tuc_id}>
        <td className='col-1'>{tin_tuc_id}</td>
        <td className='col-1'>
          <Link to={`/admin/posts/edit/${tin_tuc_id}`}>
            {`${tieu_de.substring(0, 30)}...`}
          </Link>
        </td>
        <td className='col-3'>{`${mo_ta.substring(0, 50)}...`}</td>
        <td>{nguoi_tao}</td>
        <td>{convertDate(ngay_tao)}</td>
        <td>{convertDate(ngay_sua)}</td>
        <td className='col-1'>
          <Form.Check
            type='switch'
            id='new'
            defaultChecked={!!tin_moi}
            onChange={(event) => onSwitchesHandler(event.target.id, tin_tuc_id)}
          />
        </td>
        <td className='col-1'>
          <Form.Check
            type='switch'
            id='hot'
            defaultChecked={!!tin_noi_bat}
            onChange={(event) => onSwitchesHandler(event.target.id, tin_tuc_id)}
          />
        </td>
        <td className='col-1'>
          <StatusBage status={trang_thai} />
        </td>
        <td className='col-1'>
          <div className='d-inline'>
            <Button
              variant='danger'
              size='sm'
              onClick={() => onDeletePostHandler(tin_tuc_id)}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <AdminLayout title='Posts'>
      <Row className='mb-3'>
        <Col>
          <div className='float-end'>
            <Form.Select
              onChange={(event) => setPostStatus(event.target.value)}
              value={postStatus}
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Creator</th>
                <th>Create Date</th>
                <th>Edit Date</th>
                <th>New</th>
                <th>Hot</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableBody}</tbody>
          </Table>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default PostsPage;
