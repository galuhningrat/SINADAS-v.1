import { UserRole } from '../types';
import {
  Home,
  Package,
  ShoppingCart,
  Wrench,
  Users,
  FileText,
  BarChart3,
  Settings,
  QrCode,
  Inbox,
  ClipboardList,
  Archive,
  DollarSign,
  Warehouse
} from 'lucide-react';

export interface MenuItem {
  label: string;
  icon: any;
  path: string;
  roles: UserRole[];
  badge?: number;
}

export const roleLabels: Record<UserRole, string> = {
  rektor: 'Rektor',
  sarpras: 'Bagian Sarana Prasarana',
  pj_pengadaan: 'PJ Pengadaan',
  pemeliharaan: 'Tim Pemeliharaan',
  kalab: 'Kepala Laboratorium',
  kaprodi: 'Kepala Program Studi',
  keuangan: 'Bagian Keuangan',
  administrasi: 'Administrasi',
  aslab_ti: 'Asisten Lab TI',
  aslab_elektro: 'Asisten Lab Elektro',
  aslab_mesin: 'Asisten Lab Mesin'
};

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    roles: [
      'rektor',
      'sarpras',
      'pj_pengadaan',
      'pemeliharaan',
      'kalab',
      'kaprodi',
      'keuangan',
      'administrasi',
      'aslab_ti',
      'aslab_elektro',
      'aslab_mesin'
    ]
  },
  {
    label: 'Manajemen Aset',
    icon: Package,
    path: '/assets',
    roles: ['sarpras', 'pj_pengadaan', 'kalab', 'keuangan']
  },
  {
    label: 'Daftar Aset',
    icon: Warehouse,
    path: '/assets',
    roles: ['aslab_ti', 'aslab_elektro', 'aslab_mesin']
  },
  {
    label: 'Pengadaan',
    icon: ShoppingCart,
    path: '/procurement',
    roles: ['rektor', 'sarpras', 'pj_pengadaan', 'kaprodi']
  },
  {
    label: 'Pemeliharaan',
    icon: Wrench,
    path: '/maintenance',
    roles: ['sarpras', 'pemeliharaan', 'kalab', 'aslab_ti', 'aslab_elektro', 'aslab_mesin']
  },
  {
    label: 'Peminjaman',
    icon: ClipboardList,
    path: '/borrowing',
    roles: ['sarpras', 'kalab', 'aslab_ti', 'aslab_elektro', 'aslab_mesin']
  },
  {
    label: 'Scan QR Code',
    icon: QrCode,
    path: '/qr-scanner',
    roles: ['sarpras', 'kalab', 'pemeliharaan', 'aslab_ti', 'aslab_elektro', 'aslab_mesin']
  },
  {
    label: 'Laporan',
    icon: BarChart3,
    path: '/reports',
    roles: ['rektor', 'sarpras', 'pj_pengadaan', 'keuangan', 'kalab']
  },
  {
    label: 'Arsip Dokumen',
    icon: Archive,
    path: '/documents',
    roles: ['sarpras', 'administrasi', 'pj_pengadaan']
  },
  {
    label: 'Notifikasi',
    icon: Inbox,
    path: '/notifications',
    roles: [
      'rektor',
      'sarpras',
      'pj_pengadaan',
      'pemeliharaan',
      'kalab',
      'kaprodi',
      'keuangan',
      'administrasi',
      'aslab_ti',
      'aslab_elektro',
      'aslab_mesin'
    ]
  }
];

export function getMenuForRole(role: UserRole): MenuItem[] {
  return menuItems.filter((item) => item.roles.includes(role));
}

export const rolePermissions: Record<UserRole, {
  canApprove: boolean;
  canCreateAsset: boolean;
  canEditAsset: boolean;
  canDeleteAsset: boolean;
  canCreateProcurement: boolean;
  canApproveProcurement: boolean;
  canCreateMaintenance: boolean;
  canAssignMaintenance: boolean;
  canBorrow: boolean;
  canApproveBorrowing: boolean;
  canScanQR: boolean;
  canViewReports: boolean;
  canViewAllAssets: boolean;
  canManageDocuments: boolean;
}> = {
  rektor: {
    canApprove: true,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: true,
    canCreateMaintenance: false,
    canAssignMaintenance: false,
    canBorrow: false,
    canApproveBorrowing: false,
    canScanQR: false,
    canViewReports: true,
    canViewAllAssets: true,
    canManageDocuments: false
  },
  sarpras: {
    canApprove: true,
    canCreateAsset: true,
    canEditAsset: true,
    canDeleteAsset: true,
    canCreateProcurement: true,
    canApproveProcurement: true,
    canCreateMaintenance: true,
    canAssignMaintenance: true,
    canBorrow: true,
    canApproveBorrowing: true,
    canScanQR: true,
    canViewReports: true,
    canViewAllAssets: true,
    canManageDocuments: true
  },
  pj_pengadaan: {
    canApprove: false,
    canCreateAsset: true,
    canEditAsset: true,
    canDeleteAsset: false,
    canCreateProcurement: true,
    canApproveProcurement: false,
    canCreateMaintenance: false,
    canAssignMaintenance: false,
    canBorrow: false,
    canApproveBorrowing: false,
    canScanQR: true,
    canViewReports: true,
    canViewAllAssets: true,
    canManageDocuments: true
  },
  pemeliharaan: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: false,
    canCreateMaintenance: true,
    canAssignMaintenance: true,
    canBorrow: false,
    canApproveBorrowing: false,
    canScanQR: true,
    canViewReports: false,
    canViewAllAssets: false,
    canManageDocuments: false
  },
  kalab: {
    canApprove: true,
    canCreateAsset: false,
    canEditAsset: true,
    canDeleteAsset: false,
    canCreateProcurement: true,
    canApproveProcurement: false,
    canCreateMaintenance: true,
    canAssignMaintenance: false,
    canBorrow: true,
    canApproveBorrowing: true,
    canScanQR: true,
    canViewReports: true,
    canViewAllAssets: false,
    canManageDocuments: false
  },
  kaprodi: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: true,
    canApproveProcurement: false,
    canCreateMaintenance: false,
    canAssignMaintenance: false,
    canBorrow: false,
    canApproveBorrowing: false,
    canScanQR: false,
    canViewReports: false,
    canViewAllAssets: false,
    canManageDocuments: false
  },
  keuangan: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: false,
    canCreateMaintenance: false,
    canAssignMaintenance: false,
    canBorrow: false,
    canApproveBorrowing: false,
    canScanQR: false,
    canViewReports: true,
    canViewAllAssets: true,
    canManageDocuments: false
  },
  administrasi: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: false,
    canCreateMaintenance: false,
    canAssignMaintenance: false,
    canBorrow: false,
    canApproveBorrowing: false,
    canScanQR: false,
    canViewReports: false,
    canViewAllAssets: false,
    canManageDocuments: true
  },
  aslab_ti: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: false,
    canCreateMaintenance: true,
    canAssignMaintenance: false,
    canBorrow: true,
    canApproveBorrowing: false,
    canScanQR: true,
    canViewReports: false,
    canViewAllAssets: false,
    canManageDocuments: false
  },
  aslab_elektro: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: false,
    canCreateMaintenance: true,
    canAssignMaintenance: false,
    canBorrow: true,
    canApproveBorrowing: false,
    canScanQR: true,
    canViewReports: false,
    canViewAllAssets: false,
    canManageDocuments: false
  },
  aslab_mesin: {
    canApprove: false,
    canCreateAsset: false,
    canEditAsset: false,
    canDeleteAsset: false,
    canCreateProcurement: false,
    canApproveProcurement: false,
    canCreateMaintenance: true,
    canAssignMaintenance: false,
    canBorrow: true,
    canApproveBorrowing: false,
    canScanQR: true,
    canViewReports: false,
    canViewAllAssets: false,
    canManageDocuments: false
  }
};
