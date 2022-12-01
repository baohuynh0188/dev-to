import React from 'react';
import { Badge } from 'react-bootstrap';

const StatusBage = ({
  status,
}: {
  status: 'active' | 'inactive';
}): JSX.Element => {
  const statusType = status === 'active' ? 'success' : 'secondary';
  return <Badge bg={statusType}>{status}</Badge>;
};

export default StatusBage;
