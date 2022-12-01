import axiosClient from './axiosClient';

const postApi = {
  getPosts: (params?: any) => axiosClient.get('/posts', { params }),
  getPostById: (id: string | undefined, params?: any) =>
    axiosClient.get(`/post/${id}`, { params }),
  createPost: (data: any) => axiosClient.post('/post', data),
  putPostById: (id: number, data: any) => axiosClient.put(`/post/${id}`, data),
  deletePostById: (id: number) => axiosClient.delete(`/post/${id}`),
};

export default postApi;
