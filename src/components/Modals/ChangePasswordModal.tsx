import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ModalOverlay from './ModalOverlay';

const ChangePasswordModal = ({
  show, closeModalHandler
}: {
  show: boolean;
  closeModalHandler: () => void;
}): JSX.Element => {
  const onSubmitClick = () => {};
  return (
    <ModalOverlay
      title="Change Password"
      show={show}
      size="sm"
      backdrop="static"
    >
      <ModalOverlay.Body>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter username"
              required
            />
          </Form.Group>
        </Form>
      </ModalOverlay.Body>
      <ModalOverlay.Footer onClose={closeModalHandler}>
        <Button variant="success" type="submit" onClick={onSubmitClick}>
          Change
        </Button>
      </ModalOverlay.Footer>
    </ModalOverlay>
  );
};

export default ChangePasswordModal;
