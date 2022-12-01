import React, { useState } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Categories from '../components/Categories';
import Layout from '../components/layouts/Layout';
import Post from '../components/Post';
import tabItems from '../data/tabItems';
import { useAppSelector } from '../hooks/redux-hooks';
import IPost from '../interfaces/post.interface';

const renderPost = (posts: IPost[] = [], key: string): any => {
  if (!posts.length) {
    return <></>;
  }
  switch (key) {
    case 'latest':
      return posts
        .filter((post) => post.tin_moi)
        .map((post) => <Post key={post.tin_tuc_id} item={post} />);
    case 'hot':
      return posts
        .filter((post) => post.tin_noi_bat)
        .map((post) => <Post key={post.tin_tuc_id} item={post} />);
    default:
      break;
  }
};

const HomePage = (): JSX.Element => {
  const [tabKey, setTabKey] = useState<any>();
  const posts = useAppSelector((state) => state.posts.data);

  return (
    <Layout title='Home Page' subHeading='hahaaa'>
      <Row className='gx-5 gx-lg-5'>
        <Col lg='2' xl='2'>
          <Categories />
        </Col>
        <Col md='10' lg='8' xl='10'>
          <Tabs
            id='controlled-tab-example'
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className='mb-3'
          >
            {tabItems.map(({ title, key }) => (
              <Tab eventKey={key} title={title}>
                {renderPost(posts, key)}
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
