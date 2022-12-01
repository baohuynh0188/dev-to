import axiosClient from './axiosClient';

const userApi = {
  getUsers: (params?: any) => axiosClient.get('/users', { params }),
  getUserById: (id: string | undefined) => axiosClient.get(`/user/${id}`),
  getUserCategories: (params?: any) =>
    axiosClient.get('/user-categories', { params }),
  createUser: (data: object) => axiosClient.post('/user', data),
  putUserById: (id: string, data: any) => axiosClient.put(`/user/${id}`, data),
  deleteUserById: (id: string) => axiosClient.delete(`/user/${id}`),
};

export default userApi;
