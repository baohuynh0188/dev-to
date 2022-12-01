import { createSlice } from '@reduxjs/toolkit';
import IUser from '../../interfaces/auth.interface';
import { getLocalStorge } from '../../utilities/localStorges';

interface IAction {
  payload: {
    data: IUser;
    token: string;
  };
}

interface IState {
  isLogin: boolean;
  userInfo?: IUser;
  userToken: string;
}

const { userInfo, userToken } = getLocalStorge();

const initialState: IState = {
  isLogin: !!userInfo && !!userToken,
  userInfo,
  userToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: IState, { payload }: IAction) => {
      state.isLogin = true;
      state.userInfo = payload.data;
      state.userToken = payload.token;
    },
    logout: (state: IState) => {
      state.isLogin = false;
      state.userInfo = undefined;
      state.userToken = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
