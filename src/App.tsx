import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import postApi from './api/postApi';
import postCategoryApi from './api/postCategoryApi';
import { useAppDispatch } from './hooks/redux-hooks';
import { postsGet } from './redux/slices/postsSlice';
import { postCategoriesGet } from './redux/slices/postCategoriesSlice';
import router from './router';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await postApi.getPosts();
        dispatch(postsGet(responsePosts.data));
        const responseCategories = await postCategoryApi.getAllCategory();
        dispatch(postCategoriesGet(responseCategories.data));
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  return (
    <Routes>
      {router.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default App;
