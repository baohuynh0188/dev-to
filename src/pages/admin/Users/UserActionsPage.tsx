import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useInput from '../../../hooks/useInput';
import {
  checkEmail,
  checkNotEmpty,
  checkPassword,
} from '../../../utilities/validate';
import userApi from '../../../api/userApi';
import IUser from '../../../interfaces/auth.interface';
import classNames from 'classnames';
import IUserCategory from '../../../interfaces/user-category.interface';

const UserActionsPage = ({
  isEdit = false,
}: {
  isEdit?: boolean;
}): JSX.Element => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<string>('inactive');
  const [userCategories, setUserCategories] = useState<IUserCategory[]>([]);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  const {
    value: enteredFullnameValue,
    isValid: isValidFullname,
    hasError: fullnameHasError,
    valueChangedHandler: fullnameInputChangedHandler,
    valueBlurHandler: fullnameInputBlurHandler,
    fetchValue: fullnameFetchValue,
    resetValue: resetFullnameValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const {
    value: enteredUsernameValue,
    isValid: isValidUsername,
    hasError: usernameHasError,
    valueChangedHandler: usernameInputChangedHandler,
    valueBlurHandler: usernameInputBlurHandler,
    fetchValue: usernameFetchValue,
    resetValue: resetUsernameValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const {
    value: enteredEmailValue,
    isValid: isValidEmail,
    hasError: emailHasError,
    valueChangedHandler: emailInputChangedHandler,
    valueBlurHandler: emailInputBlurHandler,
    fetchValue: emailFetchValue,
    resetValue: resetEmailValue,
  } = useInput((value: any) => checkEmail(value));

  const {
    value: enteredPhoneValue,
    valueChangedHandler: phoneInputChangedHandler,
    fetchValue: phoneFetchValue,
    resetValue: resetPhoneValue,
  } = useInput((value: any) => value);

  const {
    value: enteredJobValue,
    valueChangedHandler: jobInputChangedHandler,
    fetchValue: jobFetchValue,
    resetValue: resetJobValue,
  } = useInput((value: any) => value);

  const {
    value: enteredAddressValue,
    valueChangedHandler: addressInputChangedHandler,
    fetchValue: addressFetchValue,
    resetValue: resetAddressValue,
  } = useInput((value: any) => value);

  const {
    value: enteredCreatePasswordValue,
    isValid: isValidCreatePassword,
    hasError: createPasswordHasError,
    valueChangedHandler: createPasswordInputChangedHandler,
    valueBlurHandler: createPasswordInputBlurHandler,
    resetValue: resetCreatePasswordValue,
  } = useInput((value: any) => checkPassword(value));

  const {
    value: enteredPasswordValue,
    isValid: isValidPassword,
    hasError: passwordHasError,
    valueChangedHandler: passwordInputChangedHandler,
    valueBlurHandler: passwordInputBlurHandler,
    resetValue: resetPasswordValue,
  } = useInput((value: any) => checkPassword(value));

  const {
    value: enteredConfirmPasswordValue,
    isValid: isValidConfirmPassword,
    hasError: confirmPasswordHasError,
    valueChangedHandler: confirmPasswordInputChangedHandler,
    valueBlurHandler: confirmPasswordInputBlurHandler,
    resetValue: resetConfirmPasswordValue,
  } = useInput((value: any) => checkPassword(value));

  const {
    value: enteredCategory,
    isValid: isValidCategory,
    valueChangedHandler: categoryInputChangedHandler,
    valueBlurHandler: categoryInputBlurHandler,
    fetchValue: categoryFetchValue,
    resetValue: resetCategoryValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const clearInputs = useCallback(() => {
    resetFullnameValue();
    resetUsernameValue();
    resetCategoryValue();
    resetEmailValue();
    resetPhoneValue();
    resetJobValue();
    resetAddressValue();
    resetPhoneValue();
    resetPasswordValue();
    resetConfirmPasswordValue();
    resetCreatePasswordValue();
  }, [
    resetFullnameValue,
    resetUsernameValue,
    resetCategoryValue,
    resetEmailValue,
    resetPhoneValue,
    resetJobValue,
    resetAddressValue,
    resetPasswordValue,
    resetConfirmPasswordValue,
    resetCreatePasswordValue,
  ]);

  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const responseUserCategories = await userApi.getUserCategories();
        setUserCategories(responseUserCategories.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCategories();
    if (isEdit && userId) {
      const fetchUser = async () => {
        try {
          const { data: userData }: { data: IUser } = await userApi.getUserById(
            userId
          );
          fullnameFetchValue(userData.ten_nhan_vien);
          usernameFetchValue(userData.ten_tai_khoan);
          phoneFetchValue(userData.so_dien_thoai);
          emailFetchValue(userData.email);
          addressFetchValue(userData.dia_chi);
          jobFetchValue(userData.don_vi);
          categoryFetchValue(userData.nhom_nhan_vien_id);
        } catch (error) {
          return navigate('/admin/users');
        }
      };
      fetchUser();
    } else {
      clearInputs();
    }
  }, [
    isEdit,
    navigate,
    userId,
    fullnameFetchValue,
    usernameFetchValue,
    phoneFetchValue,
    emailFetchValue,
    clearInputs,
    addressFetchValue,
    jobFetchValue,
    categoryFetchValue,
  ]);

  let formIsInValid: boolean = true;
  if (
    isValidFullname &&
    isValidUsername &&
    isValidEmail &&
    isValidCategory &&
    (isChangePassword
      ? isValidPassword &&
        isValidConfirmPassword &&
        enteredPasswordValue === enteredConfirmPasswordValue
      : isValidCreatePassword)
  ) {
    formIsInValid = false;
  }

  const onSavePostHandler = async () => {
    try {
      const userData = {
        ten_tai_khoan: enteredUsernameValue,
        mat_khau: enteredCreatePasswordValue,
        ten_nhan_vien: enteredFullnameValue,
        trang_thai: userStatus,
        email: enteredEmailValue,
        don_vi: enteredJobValue,
        nhom_nhan_vien_id: enteredCategory,
        dia_chi: enteredAddressValue,
        so_dien_thoai: enteredPhoneValue,
      };
      if (isEdit && userId) {
        userData.mat_khau = enteredPasswordValue;
        await userApi.putUserById(userId, userData);
      } else {
        await userApi.createUser(userData);
        clearInputs();
      }
      alert('Success');
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  return (
    <AdminLayout title={isEdit ? 'Edit User' : 'Create User'}>
      <Row>
        <Col className='border rounded p-3' lg='10'>
          <Row>
            <Col lg='6'>
              <Form.Group className='mb-3' controlId='fullname'>
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': fullnameHasError })}
                  type='text'
                  placeholder='Enter your full name'
                  required
                  value={enteredFullnameValue}
                  onChange={fullnameInputChangedHandler}
                  onBlur={fullnameInputBlurHandler}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': emailHasError })}
                  type='email'
                  placeholder='Enter email'
                  required
                  value={enteredEmailValue}
                  onChange={emailInputChangedHandler}
                  onBlur={emailInputBlurHandler}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='job'>
                <Form.Label>Current Job</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your current job'
                  value={enteredJobValue}
                  onChange={jobInputChangedHandler}
                />
              </Form.Group>
            </Col>
            <Col lg='6'>
              <Form.Group className='mb-3' controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': usernameHasError })}
                  type='text'
                  placeholder='Enter username'
                  required
                  value={enteredUsernameValue}
                  onChange={usernameInputChangedHandler}
                  onBlur={usernameInputBlurHandler}
                  disabled={isEdit}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='phone'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type='tel'
                  placeholder='Enter phone number'
                  value={enteredPhoneValue}
                  onChange={phoneInputChangedHandler}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter address'
                  value={enteredAddressValue}
                  onChange={addressInputChangedHandler}
                />
              </Form.Group>
              {!isEdit && (
                <Form.Group className='mb-3' controlId='password-1'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className={classNames({
                      'is-invalid': createPasswordHasError,
                    })}
                    type='password'
                    placeholder='Enter password'
                    required
                    value={enteredCreatePasswordValue}
                    onChange={createPasswordInputChangedHandler}
                    onBlur={createPasswordInputBlurHandler}
                  />
                </Form.Group>
              )}
              {isEdit && (
                <Form.Check
                  type='switch'
                  id='change-password'
                  label='Change password'
                  checked={isChangePassword}
                  onChange={() => setIsChangePassword((prev) => !prev)}
                />
              )}
              {isEdit && isChangePassword && (
                <>
                  <Form.Group className='mb-3' controlId='password-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className={classNames({ 'is-invalid': passwordHasError })}
                      type='password'
                      placeholder='Enter password'
                      required
                      value={enteredPasswordValue}
                      onChange={passwordInputChangedHandler}
                      onBlur={passwordInputBlurHandler}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='confirm-password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      className={classNames({
                        'is-invalid': confirmPasswordHasError,
                      })}
                      type='password'
                      placeholder='Confirm Password'
                      required
                      value={enteredConfirmPasswordValue}
                      onChange={confirmPasswordInputChangedHandler}
                      onBlur={confirmPasswordInputBlurHandler}
                    />
                  </Form.Group>
                </>
              )}
            </Col>
          </Row>
        </Col>
        <Col className='border rounded p-3' lg='2'>
          <Button
            className='mb-3'
            variant='success'
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
              {userCategories.map(({ nhom_nhan_vien_id, ten_nhom }) => (
                <option key={nhom_nhan_vien_id} value={nhom_nhan_vien_id}>
                  {ten_nhom}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select
              id='status'
              onChange={(event) => setUserStatus(event.target.value)}
              value={userStatus}
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default UserActionsPage;
