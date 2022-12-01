export default interface IPostCategory {
  nhom_tin_tuc_id: number;
  ten_nhom: string;
  mo_ta: string;
  anh_dai_dien: string;
  nguoi_tao: string;
  ngay_tao: string;
  nguoi_sua: string | null;
  trang_thai: 'inactive' | 'active';
  ngay_sua: string | null;
}
