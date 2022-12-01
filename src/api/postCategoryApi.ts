import axiosClient from './axiosClient';

const postCategoryApi = {
  getAllCategory: (params?: any) =>
    axiosClient.get('/post-categories', { params }),
  getCategoryById: (categoryId?: string) =>
    axiosClient.get(`/post-category/${categoryId}`),
  createCategory: (data: any) => axiosClient.post('/post-category', data),
  deleteCategoryById: (id: number) =>
    axiosClient.delete(`/post-category/${id}`),
};

export default postCategoryApi;
