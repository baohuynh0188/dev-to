import { createSlice } from '@reduxjs/toolkit';
import IPostCategory from '../../interfaces/post-category.interface';

interface IState {
  data: IPostCategory[];
}

interface IAction {
  payload: IPostCategory[];
}

const initialState: IState = {
  data: [],
};

const postCategoriesSlice = createSlice({
  name: 'postCategories',
  initialState,
  reducers: {
    postCategoriesGet(state: IState, action: IAction) {
      state.data = [...action.payload];
    },
  },
});

export const { postCategoriesGet } = postCategoriesSlice.actions;
export default postCategoriesSlice.reducer;
