import { createSlice } from '@reduxjs/toolkit';
import IPost from '../../interfaces/post.interface';

interface IState {
  data: IPost[];
}

interface IAction {
  payload: IPost[];
}

const initialState: IState = {
  data: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsGet(state: IState, action: IAction) {
      state.data = [...action.payload];
    },
  },
});

export const { postsGet } = postsSlice.actions;
export default postsSlice.reducer;
