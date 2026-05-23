// User Roles
export type UserRole =
  | 'rektor'
  | 'sarpras'
  | 'pj_pengadaan'
  | 'pemeliharaan'
  | 'kalab'
  | 'kaprodi'
  | 'keuangan'
  | 'administrasi'
  | 'aslab_ti'
  | 'aslab_elektro'
  | 'aslab_mesin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Asset {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  condition: 'baik' | 'rusak_ringan' | 'rusak_berat' | 'dalam_perbaikan';
  status: 'aktif' | 'dalam_pemeliharaan' | 'dipinjam' | 'tidak_aktif';
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  manufacturer?: string;
  serialNumber?: string;
  warranty?: string;
  description?: string;
  image?: string;
  qrCode?: string;
}

export interface ProcurementRequest {
  id: string;
  requestNumber: string;
  title: string;
  requester: string;
  requesterId: string;
  date: string;
  category: string;
  estimatedBudget: number;
  urgency: 'rendah' | 'sedang' | 'tinggi' | 'mendesak';
  status: 'draft' | 'diajukan' | 'disetujui_kaprodi' | 'disetujui_sarpras' | 'disetujui_rektor' | 'ditolak' | 'dalam_proses' | 'selesai';
  items: ProcurementItem[];
  description: string;
  justification: string;
  approvalHistory: ApprovalStep[];
}

export interface ProcurementItem {
  id: string;
  name: string;
  specification: string;
  quantity: number;
  estimatedPrice: number;
  unit: string;
}

export interface ApprovalStep {
  approver: string;
  role: UserRole;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  notes?: string;
}

export interface MaintenanceTicket {
  id: string;
  ticketNumber: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  reportedBy: string;
  reporterId: string;
  reportDate: string;
  damageType: string;
  severity: 'ringan' | 'sedang' | 'berat';
  description: string;
  images?: string[];
  status: 'dilaporkan' | 'dalam_antrian' | 'dalam_perbaikan' | 'menunggu_part' | 'selesai' | 'ditutup';
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  completionDate?: string;
  notes?: string;
}

export interface BorrowingRequest {
  id: string;
  borrowNumber: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  borrower: string;
  borrowerId: string;
  purpose: string;
  borrowDate: string;
  returnDate: string;
  actualReturnDate?: string;
  status: 'diajukan' | 'disetujui' | 'dipinjam' | 'dikembalikan' | 'terlambat' | 'ditolak';
  approvedBy?: string;
  notes?: string;
  condition: {
    before: string;
    after?: string;
  };
}

export interface Notification {
  id: string;
  type: 'approval' | 'maintenance' | 'borrowing' | 'procurement' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  size: string;
  url: string;
  tags: string[];
}
