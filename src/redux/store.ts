import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import postCategoriesReducer from './slices/postCategoriesSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    postCategories: postCategoriesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
