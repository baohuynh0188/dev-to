import React, { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import postCategoryApi from '../../../api/postCategoryApi';
import StatusBage from '../../../components/admin/StatusBage';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import useInput from '../../../hooks/useInput';
import { postCategoriesGet } from '../../../redux/slices/postCategoriesSlice';
import { checkNotEmpty } from '../../../utilities/validate';

const PostCategoryPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.postCategories.data || []);
  const [postStatus, setPostStatus] = useState<string>('inactive');

  const {
    value: enteredTitleValue,
    isValid: isValidTitle,
    valueChangedHandler: titleInputChangedHandler,
    valueBlurHandler: titleInputBlurHandler,
    // fetchValue: titleFetchValue,
    resetValue: resetTitleValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const {
    value: enteredDescription,
    valueChangedHandler: descriptionInputChangedHandler,
    valueBlurHandler: descriptionInputBlurHandler,
    // fetchValue: descriptionFetchValue,
    resetValue: resetDescriptionValue,
  } = useInput((value: any) => value);

  let formIsInValid: boolean = true;
  if (isValidTitle) {
    formIsInValid = false;
  }

  const onAddHandler = async () => {
    try {
      const newCategory = {
        ten_nhom: enteredTitleValue,
        mo_ta: enteredDescription,
        trang_thai: postStatus,
      };
      await postCategoryApi.createCategory(newCategory);
      // reset inputs
      resetTitleValue();
      resetDescriptionValue();
      // fetch new data
      const responseCategories = await postCategoryApi.getAllCategory();
      dispatch(postCategoriesGet(responseCategories.data));
      // show alert
      alert('Success');
    } catch (error) {
      alert(error);
    }
  };

  const onDeleteHandler = async (categoryId: number) => {
    if (!window.confirm('Are you sure delete this item?')) {
      return;
    }
    try {
      await postCategoryApi.deleteCategoryById(categoryId);
      alert('Success');
      dispatch(
        postCategoriesGet(
          categories.filter((item) => item.nhom_tin_tuc_id !== categoryId)
        )
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AdminLayout title='Categories'>
      <Row>
        <Col xl='8'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const {
                  nhom_tin_tuc_id,
                  ten_nhom,
                  mo_ta,
                  ngay_tao,
                  trang_thai,
                } = category;
                return (
                  <tr key={nhom_tin_tuc_id}>
                    <td>{nhom_tin_tuc_id}</td>
                    <td>{ten_nhom}</td>
                    <td>{mo_ta}</td>
                    <td>{ngay_tao}</td>
                    <td>
                      <StatusBage status={trang_thai} />
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => onDeleteHandler(nhom_tin_tuc_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col xl='4'>
          <h3>Add a category</h3>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              required
              value={enteredTitleValue}
              onChange={titleInputChangedHandler}
              onBlur={titleInputBlurHandler}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              required
              value={enteredDescription}
              onChange={descriptionInputChangedHandler}
              onBlur={descriptionInputBlurHandler}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select
              id='status'
              onChange={(event) => setPostStatus(event.target.value)}
              value={postStatus}
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant='success'
            onClick={onAddHandler}
            disabled={formIsInValid}
          >
            Add
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default PostCategoryPage;
