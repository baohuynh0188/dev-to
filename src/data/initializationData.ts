import IPost from '../interfaces/post.interface';

export const initPostData: IPost = {
  tin_tuc_id: 0,
  tieu_de: '',
  mo_ta: '',
  noi_dung: '',
  anh_dai_dien: '',
  nhom_tin_tuc_id: 0,
  nhom: {},
  tin_moi: null,
  trang_thai: 'inactive',
  tin_noi_bat: null,
  nguoi_tao: '',
  ngay_tao: '',
  nguoi_sua: '',
  ngay_sua: '',
};
const initializationData = {
  initPostData,
};

export default initializationData;
