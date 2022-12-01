export default interface IUser {
  anh_dai_dien: string;
  chuc_vu: string;
  dia_chi: string;
  don_vi: string;
  email: string;
  gioi_thieu: string;
  gioi_tinh: 0 | 1;
  hien_thi_menu_con: 0 | 1;
  ma_gioi_thieu: string;
  ma_hoa: string;
  ma_nhom_nhan_vien: string;
  mat_khau: string;
  ngay_sinh: string;
  ngay_sua?: string;
  ngay_tao: string;
  nguoi_sua?: string;
  nguoi_tao: string;
  nhan_vien_id: string;
  nhom_nhan_vien_id: string;
  nhom_nhan_vien: {
    ten_nhom: string;
  };
  phan_quyen_nhom: string;
  so_dien_thoai: string;
  ten_nhan_vien: string;
  ten_nhom_nhan_vien: string;
  ten_tai_khoan: string;
  trang_thai: 'active' | 'inactive';
}
