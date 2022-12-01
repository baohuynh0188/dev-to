export default interface IPost {
  tin_tuc_id: number;
  tieu_de: string;
  mo_ta: string;
  noi_dung: string;
  anh_dai_dien: '';
  nhom_tin_tuc_id: number;
  nhom?: object;
  tin_moi: boolean | null;
  trang_thai: 'inactive' | 'active';
  tin_noi_bat: boolean | null;
  nguoi_tao: string;
  ngay_tao: string;
  nguoi_sua: string;
  ngay_sua: string;
}
