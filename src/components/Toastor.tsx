import React from 'react';
import { Toast } from 'react-bootstrap';

const Toastor = ({
  title,
  message,
  show,
  onClose,
}: {
  title?: string;
  message: string;
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <div className="position-relative">
      <Toast
        show={show}
        onClose={onClose}
        className="position-absolute top-0 end-0"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
          <small>1 sec ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Toastor;
