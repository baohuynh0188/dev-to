import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import postApi from '../api/postApi';
import { useParams } from 'react-router-dom';
import IPost from '../interfaces/post.interface';
import Layout from '../components/layouts/Layout';
import { initPostData } from './../data/initializationData';

const DetailPage = (): JSX.Element => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost>(initPostData);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData }: { data: IPost } = await postApi.getPostById(
          postId
        );
        setPost(postData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <Layout
      title={post.tieu_de}
      backgroundImage={`${process.env.REACT_APP_URL_API}${post.anh_dai_dien}`}
    >
      <Row>
        <Col>
          <span dangerouslySetInnerHTML={{ __html: post.noi_dung }} />
        </Col>
      </Row>
    </Layout>
  );
};

export default DetailPage;
