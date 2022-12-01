import React from 'react';
import { Button, Form } from 'react-bootstrap';
import useInput from '../../hooks/useInput';
import ModalOverlay from './ModalOverlay';
import classNames from 'classnames';
import authApi from '../../api/authApi';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { login } from '../../redux/slices/authSlice';
import { setLocalStorge } from '../../utilities/localStorges';
import {
  checkEmail,
  checkNotEmpty,
  checkPassword,
} from '../../utilities/validate';

interface ILoginModal {
  show: boolean;
  title: 'Sign Up' | 'Sign In';
  onClose: () => void;
}

const LoginModal = ({ show, title, onClose }: ILoginModal): JSX.Element => {
  const dispatch = useAppDispatch();
  const isSignUp = title === 'Sign Up';

  const {
    value: enteredUsernameValue,
    isValid: isValidUsername,
    hasError: usernameHasError,
    valueChangedHandler: usernameInputChangedHandler,
    valueBlurHandler: usernameInputBlurHandler,
    resetValue: resetUsernameValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const {
    value: enteredFullNameValue,
    isValid: isValidName,
    hasError: nameHasError,
    valueChangedHandler: fullNameInputChangedHandler,
    valueBlurHandler: fullNameInputBlurHandler,
    resetValue: resetFullNameValue,
  } = useInput((value: any) => checkNotEmpty(value));

  const {
    value: enteredEmailValue,
    isValid: isValidEmail,
    hasError: emailHasError,
    valueChangedHandler: emailInputChangedHandler,
    valueBlurHandler: emailInputBlurHandler,
    resetValue: resetEmailValue,
  } = useInput((value: any) => checkEmail(value));

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

  const closeModalHandler = (): void => {
    onClose();
    resetUsernameValue();
    resetPasswordValue();
    resetConfirmPasswordValue();
    resetEmailValue();
    resetFullNameValue();
  };

  const onLoginClick = async () => {
    try {
      let response: any;
      if (isSignUp) {
        response = await authApi.signUp({
          ten_tai_khoan: enteredUsernameValue,
          mat_khau: enteredPasswordValue,
          ten_nhan_vien: enteredFullNameValue,
          email: enteredEmailValue,
          xac_nhan_mat_khau: enteredConfirmPasswordValue,
        });
      } else {
        response = await authApi.signIn({
          ten_tai_khoan: enteredUsernameValue,
          mat_khau: enteredPasswordValue,
        });
      }

      if (!response && !response.success) {
        alert('Something went wrong, please try again');
        return;
      }

      setLocalStorge(response);
      dispatch(login(response));
      closeModalHandler();
      alert('Login success.');
    } catch (err: any) {
      console.log('Failed to login: ', err);
      alert(err.response.data.error);
    }
  };

  let formIsInValid: boolean = true;

  if (
    isValidUsername &&
    isValidPassword &&
    (isSignUp ? isValidEmail && isValidName && isValidConfirmPassword : true)
  ) {
    formIsInValid = false;
  }

  return (
    <ModalOverlay title={title} show={show} size='sm' backdrop='static'>
      <ModalOverlay.Body>
        <Form validated={!formIsInValid}>
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
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
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
          {isSignUp && (
            <>
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
              <Form.Group className='mb-3' controlId='fullname'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': nameHasError })}
                  type='text'
                  placeholder='Enter full name'
                  required
                  value={enteredFullNameValue}
                  onChange={fullNameInputChangedHandler}
                  onBlur={fullNameInputBlurHandler}
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
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </>
          )}
        </Form>
      </ModalOverlay.Body>
      <ModalOverlay.Footer onClose={closeModalHandler}>
        <Button
          variant='success'
          type='submit'
          onClick={onLoginClick}
          disabled={formIsInValid}
        >
          {title}
        </Button>
      </ModalOverlay.Footer>
    </ModalOverlay>
  );
};

export default LoginModal;
