import React from 'react';

const PostBadge = ({
  isNew,
  isOutstanding,
}: {
  isNew: boolean | null;
  isOutstanding: boolean | null;
}): JSX.Element => {
  return (
    <div className='my-2'>
      {!!isNew && (
        <span className='me-2 badge rounded-pill bg-primary'>New</span>
      )}
      {!!isOutstanding && (
        <span className='badge rounded-pill bg-warning text-dark'>
          Hot
        </span>
      )}
    </div>
  );
};

export default PostBadge;
