export type DataInstance = {
  id: number;
  no: number;
  name: string;
  slug: string;
  alamat: string;
  telp: string;
  email: string;
  desc: string;
  pj: string;
  nip_pj: string;
  image: string;
  active_online: boolean;
  active_offline: boolean;
  status: boolean;
  jam_buka: string;
  jam_tutup: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  jmlLayanan: number;
};

export type DataLayanan = {
  id: number;
  nomor: number;
  name?: string;
  slug: string;
  desc: string;
  dasarhukum: string;
  syarat: string;
  instansi: string;
  instansi_id: number;
  active_online: boolean;
  active_offline: boolean;
  status: boolean;
  instansi_name: string;
};