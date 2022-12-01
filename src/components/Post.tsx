import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/Post.css';
import IPost from '../interfaces/post.interface';
import { convertDate } from '../utilities/stringUtils';
import PostBadge from './PostBadge';

const Post = ({ item }: { item: IPost }): JSX.Element => {
  const {
    tin_tuc_id,
    tieu_de,
    mo_ta,
    anh_dai_dien,
    tin_moi,
    tin_noi_bat,
    nguoi_tao,
    ngay_tao,
  } = item;

  return (
    <div className='post-preview mb-4 border-bottom border-3'>
      <PostBadge isNew={tin_moi} isOutstanding={tin_noi_bat} />
      <Link className='text-decoration-none' to={`/detail/${tin_tuc_id}`}>
        <h2>{tieu_de}</h2>
      </Link>
      <Image
        src={`https://exam-dev-api.web5days.com:5001/${anh_dai_dien}`}
        rounded={true}
      />
      <p className='pt-3'>{mo_ta}</p>
      <p className='fw-light fst-italic'>
        Posted by&nbsp;
        <Link className='text-decoration-none' to='/'>
          {nguoi_tao}
        </Link>
        &nbsp;on&nbsp;{convertDate(ngay_tao)}
      </p>
    </div>
  );
};

export default Post;
