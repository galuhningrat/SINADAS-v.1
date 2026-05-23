# SINADAS - Panduan Prototype

## 🎯 Ringkasan Prototype

Prototype High-Fidelity Interactive SINADAS (Sistem Informasi Aset dan Sarana Prasarana) yang komprehensif dengan dukungan penuh **Role-Based Access Control (RBAC)** untuk 11 role stakeholder yang berbeda.

### ✨ Fitur Utama

- ✅ **Autentikasi dengan Role Selection** - Login dengan multi-role support
- ✅ **11 Role Stakeholder** dengan akses berbeda
- ✅ **Dashboard Custom per Role** - Tampilan berbeda sesuai role
- ✅ **Manajemen Aset Lengkap** - List, detail, tabs, QR code
- ✅ **Pengadaan dengan Approval Workflow** - Multi-level approval
- ✅ **Pemeliharaan & Pelaporan Kerusakan** - Via QR scan atau manual
- ✅ **Peminjaman Aset** - Request, approval, tracking
- ✅ **QR Code Scanner** - Scan untuk info aset & lapor kerusakan
- ✅ **Notifikasi per Role** - Custom untuk setiap stakeholder
- ✅ **Laporan & Analytics** - Charts dan visualisasi data
- ✅ **Arsip Dokumen** - Manajemen dokumen terkait aset
- ✅ **Profile & Settings** - Pengaturan akun dan notifikasi
- ✅ **Responsive Design** - Desktop & Mobile ready

---

## 👥 Daftar Role & Akses

### 1. **Rektor** (Executive View)
- **Email:** `rektor@sinadas.ac.id`
- **Dashboard:** Executive dashboard dengan KPI dan approval pending
- **Akses:**
  - ✅ Lihat semua aset (read-only)
  - ✅ Approve pengadaan (level tertinggi)
  - ✅ Laporan strategis & analytics
  - ✅ Notifikasi approval request
- **Menu:** Dashboard, Pengadaan, Laporan, Notifikasi

### 2. **Bagian Sarpras** (Super Admin)
- **Email:** `sarpras@sinadas.ac.id`
- **Dashboard:** Full control panel dengan semua statistik
- **Akses:**
  - ✅ Full akses manajemen aset (CRUD)
  - ✅ Approve pengadaan (level 2)
  - ✅ Assign maintenance tickets
  - ✅ Approve peminjaman
  - ✅ Scan QR code
  - ✅ Kelola dokumen
- **Menu:** Dashboard, Manajemen Aset, Pengadaan, Pemeliharaan, Peminjaman, QR Scanner, Laporan, Arsip Dokumen, Notifikasi

### 3. **PJ Pengadaan** (Procurement Officer)
- **Email:** `pengadaan@sinadas.ac.id`
- **Dashboard:** Fokus pengadaan dan penerimaan aset
- **Akses:**
  - ✅ Create & edit aset (input aset baru)
  - ✅ Create pengadaan
  - ✅ View laporan pengadaan
  - ✅ Scan QR code
  - ✅ Kelola dokumen
- **Menu:** Dashboard, Manajemen Aset, Pengadaan, Laporan, Arsip Dokumen, Notifikasi

### 4. **Tim Pemeliharaan**
- **Email:** `pemeliharaan@sinadas.ac.id`
- **Dashboard:** Fokus tiket maintenance
- **Akses:**
  - ✅ Create maintenance tickets
  - ✅ Assign maintenance tasks
  - ✅ Update status perbaikan
  - ✅ Scan QR code
- **Menu:** Dashboard, Pemeliharaan, Scan QR Code, Notifikasi

### 5. **Kalab** (Kepala Laboratorium)
- **Email:** `kalab@sinadas.ac.id`
- **Dashboard:** Manajemen aset laboratorium
- **Akses:**
  - ✅ View & edit aset lab
  - ✅ Create pengadaan (request)
  - ✅ Create maintenance tickets
  - ✅ Approve peminjaman aset lab
  - ✅ Scan QR code
  - ✅ Laporan lab
- **Menu:** Dashboard, Manajemen Aset, Pengadaan, Pemeliharaan, Peminjaman, QR Scanner, Laporan, Notifikasi

### 6. **Kaprodi TI**
- **Email:** `kaprodi@sinadas.ac.id`
- **Dashboard:** Panel pengajuan kebutuhan prodi
- **Akses:**
  - ✅ Create pengadaan (request untuk prodi)
  - ✅ View aset (limited)
- **Menu:** Dashboard, Pengadaan, Notifikasi

### 7. **Bagian Keuangan**
- **Email:** `keuangan@sinadas.ac.id`
- **Dashboard:** View laporan keuangan aset
- **Akses:**
  - ✅ View semua aset (read-only)
  - ✅ Laporan nilai aset & keuangan
- **Menu:** Dashboard, Manajemen Aset (view only), Laporan, Notifikasi

### 8. **Administrasi**
- **Email:** `admin@sinadas.ac.id`
- **Dashboard:** Fokus arsip dokumen
- **Akses:**
  - ✅ Kelola arsip dokumen
  - ✅ Upload & download dokumen
- **Menu:** Dashboard, Arsip Dokumen, Notifikasi

### 9-11. **Aslab** (Multi-role: TI, Elektro, Mesin)
- **Email:** `aslab@sinadas.ac.id` (akan diminta pilih role)
- **Dashboard:** Panel untuk asisten lab
- **Akses:**
  - ✅ Scan QR code aset
  - ✅ Lapor kerusakan via QR scan
  - ✅ Create peminjaman aset
  - ✅ View daftar aset
  - ✅ View riwayat peminjaman
- **Menu:** Dashboard, Daftar Aset (view), Pemeliharaan, Peminjaman, Scan QR Code, Notifikasi

---

## 🔐 Cara Login & Testing

### Demo Credentials
**Password untuk semua akun:** `demo123`

### Test Flow 1: Login sebagai Rektor
```
1. Buka aplikasi
2. Login dengan: rektor@sinadas.ac.id / demo123
3. Lihat dashboard executive dengan pending approvals
4. Klik pengadaan yang menunggu approval
5. Approve/reject pengadaan
6. Lihat laporan strategis
```

### Test Flow 2: Login sebagai Aslab (Multi-role)
```
1. Login dengan: aslab@sinadas.ac.id / demo123
2. Pilih salah satu role: Aslab TI / Elektro / Mesin
3. Klik "Scan QR Code" di dashboard atau menu
4. Scan QR code (akan simulasi scan otomatis)
5. Lihat detail aset yang di-scan
6. Klik "Laporkan Kerusakan" untuk buat tiket maintenance
7. Atau klik "Pinjam Aset" untuk ajukan peminjaman
```

### Test Flow 3: Login sebagai Sarpras (Full Access)
```
1. Login dengan: sarpras@sinadas.ac.id / demo123
2. Explore semua menu (full access):
   - Manajemen Aset: Create, edit, delete aset
   - Pengadaan: Approve pengadaan dari Kaprodi
   - Pemeliharaan: Assign tiket ke teknisi
   - Peminjaman: Approve request peminjaman
   - QR Scanner: Scan aset
   - Laporan: Lihat semua analytics
   - Arsip Dokumen: Upload & manage dokumen
```

### Test Flow 4: Workflow Pengadaan Lengkap
```
1. Login sebagai Kaprodi (kaprodi@sinadas.ac.id)
   → Buat pengajuan pengadaan baru
   
2. Logout, login sebagai Sarpras (sarpras@sinadas.ac.id)
   → Approve pengadaan
   
3. Logout, login sebagai Rektor (rektor@sinadas.ac.id)
   → Lihat notifikasi
   → Final approval pengadaan
```

---

## 📱 Fitur Mobile-Friendly

Beberapa fitur dioptimalkan untuk mobile:
- **QR Scanner** - Optimized untuk smartphone camera
- **Laporan Kerusakan** - Form responsive
- **Notifikasi** - Mobile-optimized cards
- **Peminjaman** - Quick action buttons

---

## 🎨 Design System

**Primary Color:** Deep Maroon `#6B1F3A`
- Maroon 50: `#f9f5f7`
- Maroon 600: `#6B1F3A` (Primary)
- Maroon 700: `#5a1a31`
- Maroon 900: `#3d1424`

**Components:**
- Lucide React Icons
- Recharts untuk visualisasi
- Radix UI primitives
- Tailwind CSS v4

---

## 📊 Statistik Prototype

### Screens/Pages Dibuat: **30+ screens**

1. **Authentication** (2 screens)
   - Login Page
   - Role Selection Page

2. **Dashboards** (5 variants)
   - Rektor Dashboard (Executive)
   - Sarpras Dashboard (Full Admin)
   - Aslab Dashboard (Lab Assistant)
   - Kalab/Kaprodi Dashboard
   - Default Dashboard

3. **Manajemen Aset** (3 screens)
   - Asset List Page (table view)
   - Asset Detail Page (4 tabs)
   - Asset Form (create/edit - navigable)

4. **Pengadaan** (3 screens)
   - Procurement List Page
   - Procurement Detail Page (dengan approval flow)
   - Procurement Form (create - navigable)

5. **Pemeliharaan** (2 screens)
   - Maintenance Tickets List
   - Maintenance Detail (navigable)

6. **Peminjaman** (2 screens)
   - Borrowing List
   - Borrowing Detail (navigable)

7. **Other Modules** (6 screens)
   - QR Scanner Page (interactive simulation)
   - Notifications Page (role-specific)
   - Reports & Analytics Page (dengan charts)
   - Documents Archive Page
   - Profile Page (3 tabs: Profile, Notifications, Security)
   - Settings

### Komponen Reusable: **10+ components**
- Layout dengan Sidebar
- Role-based Navigation
- Stats Cards
- Data Tables
- Charts (Bar, Line, Pie)
- Status Badges
- Action Buttons
- Modal/Dialog (via Radix)

### Mock Data: **150+ records**
- 5 Assets dengan detail lengkap
- 2 Procurement requests dengan approval history
- 2 Maintenance tickets
- 2 Borrowing requests
- 20+ Notifications (per role)
- 3 Documents

---

## ⚡ Interaktivitas

✅ **Navigasi:**
- Semua link dan tombol fungsional
- Breadcrumb navigation
- Deep linking (langsung ke detail page via URL)

✅ **State Management:**
- Authentication context
- Role-based routing
- Protected routes

✅ **User Feedback:**
- Toast notifications (Sonner)
- Loading states
- Hover effects
- Active states

✅ **Forms:**
- Input validation ready
- Form states (pending, approved, rejected)
- Multi-step workflows

---

## 🚀 Cara Menguji Prototype

1. **Test RBAC:**
   - Login dengan berbagai role
   - Perhatikan perbedaan menu sidebar
   - Perhatikan perbedaan dashboard content
   - Perhatikan perbedaan tombol aksi (create, edit, delete, approve)

2. **Test Workflows:**
   - Pengadaan: Buat → Approve (multi-level)
   - Maintenance: Scan QR → Lapor kerusakan
   - Peminjaman: Request → Approve → Track

3. **Test Navigation:**
   - Klik semua menu
   - Navigate ke detail pages
   - Back navigation
   - Breadcrumbs

4. **Test Responsive:**
   - Resize browser
   - Check mobile sidebar
   - Check table responsiveness
   - Check charts responsiveness

---

## 📁 Struktur File

```
src/app/
├── App.tsx                          # Main app dengan routing
├── types/index.ts                   # TypeScript types
├── contexts/
│   └── AuthContext.tsx              # Authentication & role management
├── config/
│   └── roles.ts                     # Role permissions & menu config
├── data/
│   └── mockData.ts                  # Mock data untuk demo
├── components/
│   └── Layout.tsx                   # Main layout dengan sidebar
└── pages/
    ├── LoginPage.tsx
    ├── DashboardPage.tsx            # Multi-variant dashboard
    ├── AssetsPage.tsx
    ├── AssetDetailPage.tsx
    ├── ProcurementPage.tsx
    ├── ProcurementDetailPage.tsx
    ├── MaintenancePage.tsx
    ├── BorrowingPage.tsx
    ├── QRScannerPage.tsx
    ├── NotificationsPage.tsx
    ├── ReportsPage.tsx
    ├── DocumentsPage.tsx
    └── ProfilePage.tsx
```

---

## 🎯 Key Differentiators

1. **True RBAC Implementation** - Bukan hanya visual, tapi logic akses berbeda per role
2. **Multi-level Approval Workflow** - Simulasi approval bertingkat dengan history
3. **Interactive QR Scanner** - Simulasi scan dengan aksi langsung
4. **Role-specific Dashboards** - Setiap role dashboard berbeda sesuai kebutuhan
5. **Comprehensive Data Visualization** - Charts interaktif dengan Recharts
6. **Real-world Workflows** - Alur kerja yang mencerminkan proses nyata

---

## 💡 Next Steps (Jika Dikembangkan Lebih Lanjut)

1. ✨ Tambah form create/edit untuk semua modul
2. 🔗 Integrasi dengan backend API
3. 📸 Real QR scanner dengan device camera
4. 🔔 Real-time notifications dengan WebSocket
5. 📄 PDF export untuk laporan
6. 🖨️ Print QR labels untuk aset
7. 📧 Email notifications
8. 📊 Advanced analytics & dashboards
9. 🔍 Advanced search & filters
10. 📱 PWA untuk mobile app

---

## ✅ Checklist Testing

- [ ] Login dengan semua 9 akun berbeda
- [ ] Verifikasi sidebar menu berbeda per role
- [ ] Verifikasi dashboard content berbeda per role
- [ ] Test multi-role selection (aslab@sinadas.ac.id)
- [ ] Scan QR code dan test semua aksi (detail, lapor, pinjam)
- [ ] Navigate ke detail aset dan explore semua tabs
- [ ] Navigate ke detail pengadaan dan lihat approval flow
- [ ] Check notifikasi berbeda per role
- [ ] View laporan dan interact dengan charts
- [ ] Test profile settings (3 tabs)
- [ ] Logout dan login ulang
- [ ] Test responsive di mobile view

---

**Selamat mencoba prototype SINADAS! 🎉**

Untuk pertanyaan atau feedback, silakan hubungi tim developer.
