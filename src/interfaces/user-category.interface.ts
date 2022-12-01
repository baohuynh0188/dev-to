export default interface IUserCategory {
  hien_thi_menu_con: number;
  ma_nhom: string;
  mo_ta: string;
  ngay_sua: string;
  ngay_tao: string;
  nguoi_sua?: string;
  nguoi_tao: string;
  nhom_nhan_vien_id: string;
  nhomnhanviencha_id: string;
  phan_quyen: string;
  soluong: number;
  ten_nhom: string;
  trang_thai: 'active' | 'inactive';
}
