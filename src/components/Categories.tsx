import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import IPostCategory from '../interfaces/post-category.interface';

const Categories = (): JSX.Element => {
  const categories = useAppSelector((state) => state.postCategories.data || []);
  return (
    <ListGroup>
      {categories.map((item: IPostCategory) => {
        const { nhom_tin_tuc_id, ten_nhom } = item;
        return (
          <ListGroup.Item key={nhom_tin_tuc_id}>
            <Link to={`/${nhom_tin_tuc_id}`}>{ten_nhom}</Link>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Categories;
