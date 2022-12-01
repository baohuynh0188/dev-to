import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import tinymceConfig from '../../../data/tinymceConfig';
import { useNavigate, useParams } from 'react-router-dom';
import postApi from '../../../api/postApi';
import IPost from '../../../interfaces/post.interface';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useInput from '../../../hooks/useInput';
import { checkNotEmpty } from '../../../utilities/validate';
import { useAppSelector } from '../../../hooks/redux-hooks';

const PostActionsPage = ({
  isEdit = false,
}: {
  isEdit?: boolean;
}): JSX.Element => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const editorRef: any = useRef(null);
  const categories = useAppSelector((state) => state.postCategories.data || []);
  const [postStatus, setPostStatus] = useState<string>('inactive');
  const [postNew, setPostNew] = useState<boolean>(false);
  const [postHot, setPostHot] = useState<boolean>(false);
  const onInitHandler = (evt: any, editor: any) => (editorRef.current = editor);

  const {
    value: enteredTitleValue,
    isValid: isValidTitle,
    valueChangedHandler: titleInputChangedHandler,
    valueBlurHandler: titleInputBlurHandler,
    fetchValue: titleFetchValue,
    resetValue: resetTitleValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const {
    value: enteredDescription,
    isValid: isValidDescription,
    valueChangedHandler: descriptionInputChangedHandler,
    valueBlurHandler: descriptionInputBlurHandler,
    fetchValue: descriptionFetchValue,
    resetValue: resetDescriptionValue,
  } = useInput((value: any) => value);

  const {
    value: enteredContent,
    valueChangedHandler: contentInputChangedHandler,
    fetchValue: contentFetchValue,
    resetValue: resetContentValue,
  } = useInput((value: any) => value);

  const {
    value: enteredCategory,
    isValid: isValidCategory,
    valueChangedHandler: categoryInputChangedHandler,
    valueBlurHandler: categoryInputBlurHandler,
    fetchValue: categoryFetchValue,
    resetValue: resetCategoryValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const clearInputs = useCallback(() => {
    resetTitleValue();
    resetContentValue();
    resetDescriptionValue();
    resetCategoryValue();
  }, [
    resetCategoryValue,
    resetContentValue,
    resetDescriptionValue,
    resetTitleValue,
  ]);

  useEffect(() => {
    if (isEdit && postId) {
      const fetchPost = async () => {
        try {
          const { data: postData }: { data: IPost } = await postApi.getPostById(
            postId
          );
          titleFetchValue(postData.tieu_de);
          descriptionFetchValue(postData.mo_ta);
          contentFetchValue(postData.noi_dung);
          categoryFetchValue(postData.nhom_tin_tuc_id.toString());
          setPostHot(!!postData.tin_noi_bat);
          setPostNew(!!postData.tin_moi);
          setPostStatus(postData.trang_thai);
        } catch (error) {
          return navigate('/admin/posts');
        }
      };
      fetchPost();
    } else {
      clearInputs();
    }
  }, [
    categoryFetchValue,
    clearInputs,
    contentFetchValue,
    descriptionFetchValue,
    isEdit,
    navigate,
    postId,
    titleFetchValue,
  ]);

  let formIsInValid: boolean = true;
  if (isValidTitle && isValidDescription && isValidCategory) {
    formIsInValid = false;
  }

  const onSavePostHandler = async () => {
    if (editorRef.current) {
      try {
        const postData = {
          tieu_de: enteredTitleValue,
          mo_ta: enteredDescription,
          noi_dung: editorRef.current.getContent(),
          nhom_tin_tuc_id: enteredCategory,
          tin_noi_bat: postHot,
          tin_moi: postNew,
          trang_thai: postStatus,
        };
        if (isEdit && postId) {
          await postApi.putPostById(+postId, postData);
        } else {
          await postApi.createPost(postData);
          clearInputs();
        }
        alert('Success');
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <AdminLayout title={isEdit ? 'Edit Post' : 'Create Posts'}>
      <Row>
        <Col className='border rounded p-3' lg='10'>
          <Row>
            <Col lg='6'>
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
            </Col>
            <Col lg='6'>
              <Form.Group className='mb-3' controlId='description'>
                <Form.Label>description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={enteredDescription}
                  onChange={descriptionInputChangedHandler}
                  onBlur={descriptionInputBlurHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Editor
            onInit={onInitHandler}
            onChange={contentInputChangedHandler}
            initialValue={enteredContent}
            init={tinymceConfig}
          />
        </Col>
        <Col className='border rounded p-3' lg='2'>
          <Button
            variant='success'
            className='mb-3'
            onClick={onSavePostHandler}
            disabled={formIsInValid}
          >
            Save
          </Button>
          <Form.Group className='mb-3' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Select
              id='category'
              value={enteredCategory}
              onChange={categoryInputChangedHandler}
              onBlur={categoryInputBlurHandler}
            >
              <option value=''>Select category</option>
              {categories.map(({ nhom_tin_tuc_id, ten_nhom }) => (
                <option key={nhom_tin_tuc_id} value={nhom_tin_tuc_id}>
                  {ten_nhom}
                </option>
              ))}
            </Form.Select>
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
          <Form.Check
            type='switch'
            id='hot'
            label='Hot'
            checked={postHot}
            onChange={() => setPostHot((prevState) => !prevState)}
          />
          <Form.Check
            type='switch'
            id='new'
            label='New'
            checked={postNew}
            onChange={() => setPostNew((prevState) => !prevState)}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default PostActionsPage;
