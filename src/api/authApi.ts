import axiosClient from './axiosClient';

interface ISignIn {
  ten_tai_khoan: string;
  mat_khau: string;
}

interface ISignUp {
  ten_tai_khoan: string;
  ten_nhan_vien: string;
  email: string;
  mat_khau: string;
  xac_nhan_mat_khau: string;
}

const authApi = {
  signIn: (data: ISignIn) => axiosClient.post('/user/login', data),
  signUp: (data: ISignUp) => axiosClient.post('/user/regUser', data),
  getUserById: (id: string | undefined, params?: any) =>
    axiosClient.get(`/user/${id}`, { params }),
};

export default authApi;
