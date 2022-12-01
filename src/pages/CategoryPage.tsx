import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import postApi from '../api/postApi';
import postCategoryApi from '../api/postCategoryApi';
import Categories from '../components/Categories';
import Layout from '../components/layouts/Layout';
import Post from '../components/Post';
import IPostCategory from '../interfaces/post-category.interface';
import IPost from '../interfaces/post.interface';

const CategoryPage = () => {
  const { categories } = useParams();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [category, setCategory] = useState<IPostCategory>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseCategory = await postCategoryApi.getCategoryById(
          categories
        );
        const responsePosts = await postApi.getPosts({ categories });
        setCategory(responseCategory.data);
        setPosts(responsePosts.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [categories]);

  return (
    <Layout title={category?.ten_nhom ?? ''} subHeading='Categories'>
      <Row className='gx-5 gx-lg-5'>
        <Col lg='2' xl='2'>
          <Categories />
        </Col>
        <Col md='10' lg='8' xl='10'>
          {posts.map((post) => (
            <Post key={post.tin_tuc_id} item={post} />
          ))}
        </Col>
      </Row>
    </Layout>
  );
};

export default CategoryPage;
