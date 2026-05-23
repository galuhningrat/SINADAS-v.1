import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  DollarSign,
  FileText,
  ArrowRight,
  Activity
} from 'lucide-react';
import { mockAssets, mockProcurements, mockMaintenanceTickets, mockBorrowings } from '../data/mockData';
import { getMenuForRole } from '../config/roles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#6B1F3A', '#9e3c5e', '#b86687', '#d199b3'];

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const renderRektorDashboard = () => {
    const pendingApprovals = mockProcurements.filter(
      (p) => p.status === 'disetujui_sarpras'
    );

    const assetStats = {
      total: mockAssets.length,
      active: mockAssets.filter((a) => a.status === 'aktif').length,
      totalValue: mockAssets.reduce((sum, a) => sum + a.currentValue, 0)
    };

    const monthlyData = [
      { month: 'Jan', value: 320 },
      { month: 'Feb', value: 350 },
      { month: 'Mar', value: 380 },
      { month: 'Apr', value: 400 },
      { month: 'Mei', value: assetStats.totalValue / 1000000 }
    ];

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, {user.name}</h1>
          <p className="text-gray-600">Ringkasan eksekutif aset dan sarana prasarana</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <Package className="h-6 w-6 text-[#6B1F3A]" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Aset</p>
            <p className="text-2xl font-bold text-gray-900">{assetStats.total}</p>
            <p className="text-xs text-green-600 mt-2">+12% dari bulan lalu</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <DollarSign className="h-6 w-6 text-[#6B1F3A]" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Nilai Aset</p>
            <p className="text-2xl font-bold text-gray-900">
              Rp {(assetStats.totalValue / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-gray-500 mt-2">Total nilai saat ini</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <FileText className="h-6 w-6 text-[#6B1F3A]" />
              </div>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Menunggu Persetujuan</p>
            <p className="text-2xl font-bold text-gray-900">{pendingApprovals.length}</p>
            <p className="text-xs text-orange-600 mt-2">Pengadaan baru</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <Activity className="h-6 w-6 text-[#6B1F3A]" />
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Kondisi Baik</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round((assetStats.active / assetStats.total) * 100)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">Dari total aset</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Tren Nilai Aset (Jutaan Rp)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6B1F3A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Distribusi Status Aset</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Aktif', value: mockAssets.filter(a => a.status === 'aktif').length },
                    { name: 'Dalam Pemeliharaan', value: mockAssets.filter(a => a.status === 'dalam_pemeliharaan').length },
                    { name: 'Dipinjam', value: mockAssets.filter(a => a.status === 'dipinjam').length }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Pengadaan Menunggu Persetujuan</h3>
              <button
                onClick={() => navigate('/procurement')}
                className="text-sm text-[#6B1F3A] hover:underline flex items-center gap-1"
              >
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((proc) => (
                <div
                  key={proc.id}
                  onClick={() => navigate(`/procurement/${proc.id}`)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#6B1F3A] hover:bg-[#f9f5f7] cursor-pointer transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{proc.title}</p>
                    <p className="text-sm text-gray-600">{proc.requester}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      Rp {(proc.estimatedBudget / 1000000).toFixed(0)}M
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                      Menunggu Persetujuan
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSarprasDashboard = () => {
    const stats = {
      totalAssets: mockAssets.length,
      activeProcurements: mockProcurements.filter(p => p.status !== 'selesai' && p.status !== 'ditolak').length,
      openTickets: mockMaintenanceTickets.filter(t => t.status !== 'selesai' && t.status !== 'ditutup').length,
      activeBorrowings: mockBorrowings.filter(b => b.status === 'dipinjam').length
    };

    const categoryData = [
      { name: 'Komputer', value: mockAssets.filter(a => a.category === 'Komputer').length },
      { name: 'Elektronik', value: mockAssets.filter(a => a.category === 'Elektronik').length },
      { name: 'Alat Ukur', value: mockAssets.filter(a => a.category === 'Alat Ukur').length },
      { name: 'Mesin', value: mockAssets.filter(a => a.category === 'Mesin').length },
      { name: 'Server', value: mockAssets.filter(a => a.category === 'Server').length }
    ];

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, {user.name}</h1>
          <p className="text-gray-600">Panel kontrol penuh manajemen aset</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <Package className="h-6 w-6 text-[#6B1F3A]" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Aset</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalAssets}</p>
            <button
              onClick={() => navigate('/assets')}
              className="text-xs text-[#6B1F3A] hover:underline mt-2 flex items-center gap-1"
            >
              Kelola Aset
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <FileText className="h-6 w-6 text-[#6B1F3A]" />
              </div>
              {stats.activeProcurements > 0 && (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">Pengadaan Aktif</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeProcurements}</p>
            <button
              onClick={() => navigate('/procurement')}
              className="text-xs text-[#6B1F3A] hover:underline mt-2 flex items-center gap-1"
            >
              Lihat Pengadaan
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <AlertTriangle className="h-6 w-6 text-[#6B1F3A]" />
              </div>
              {stats.openTickets > 0 && (
                <Clock className="h-5 w-5 text-red-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">Tiket Terbuka</p>
            <p className="text-2xl font-bold text-gray-900">{stats.openTickets}</p>
            <button
              onClick={() => navigate('/maintenance')}
              className="text-xs text-[#6B1F3A] hover:underline mt-2 flex items-center gap-1"
            >
              Kelola Tiket
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                <Clock className="h-6 w-6 text-[#6B1F3A]" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Dipinjam</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeBorrowings}</p>
            <button
              onClick={() => navigate('/borrowing')}
              className="text-xs text-[#6B1F3A] hover:underline mt-2 flex items-center gap-1"
            >
              Kelola Peminjaman
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Aset per Kategori</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6B1F3A" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Tiket Pemeliharaan Terbaru</h3>
            <div className="space-y-3">
              {mockMaintenanceTickets.slice(0, 5).map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => navigate(`/maintenance/${ticket.id}`)}
                  className="flex items-start justify-between p-3 border border-gray-200 rounded-lg hover:border-[#6B1F3A] hover:bg-[#f9f5f7] cursor-pointer transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{ticket.assetName}</p>
                    <p className="text-xs text-gray-600">{ticket.ticketNumber}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'dilaporkan'
                        ? 'bg-red-100 text-red-700'
                        : ticket.status === 'dalam_perbaikan'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {ticket.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAslabDashboard = () => {
    const myBorrowings = mockBorrowings.filter(b => b.borrowerId.includes('aslab'));
    const myTickets = mockMaintenanceTickets.filter(t => t.reporterId.includes('aslab'));

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, {user.name}</h1>
          <p className="text-gray-600">Panel asisten laboratorium</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="p-3 bg-[#f9f5f7] rounded-lg w-fit mb-4">
              <Package className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Peminjaman Saya</p>
            <p className="text-2xl font-bold text-gray-900">{myBorrowings.length}</p>
            <button
              onClick={() => navigate('/borrowing')}
              className="text-xs text-[#6B1F3A] hover:underline mt-2 flex items-center gap-1"
            >
              Lihat Detail
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="p-3 bg-[#f9f5f7] rounded-lg w-fit mb-4">
              <AlertTriangle className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Laporan Kerusakan</p>
            <p className="text-2xl font-bold text-gray-900">{myTickets.length}</p>
            <button
              onClick={() => navigate('/maintenance')}
              className="text-xs text-[#6B1F3A] hover:underline mt-2 flex items-center gap-1"
            >
              Lihat Tiket
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 bg-gradient-to-br from-[#6B1F3A] to-[#5a1a31] text-white">
            <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
              <Activity className="h-6 w-6" />
            </div>
            <p className="text-sm text-white/80 mb-2">Scan QR Code</p>
            <p className="text-xs text-white/70 mb-4">Scan untuk info aset & lapor kerusakan</p>
            <button
              onClick={() => navigate('/qr-scanner')}
              className="bg-white text-[#6B1F3A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Buka Scanner
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Peminjaman Aktif</h3>
            {myBorrowings.filter(b => b.status === 'dipinjam').length > 0 ? (
              <div className="space-y-3">
                {myBorrowings.filter(b => b.status === 'dipinjam').map((borrow) => (
                  <div key={borrow.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{borrow.assetName}</p>
                        <p className="text-sm text-gray-600">{borrow.assetCode}</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                        Dipinjam
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Kembali: {borrow.returnDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Tidak ada peminjaman aktif</p>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Laporan Kerusakan Saya</h3>
            {myTickets.length > 0 ? (
              <div className="space-y-3">
                {myTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.assetName}</p>
                        <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          ticket.status === 'dilaporkan'
                            ? 'bg-red-100 text-red-700'
                            : ticket.status === 'dalam_perbaikan'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {ticket.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Tidak ada laporan kerusakan</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDefaultDashboard = () => {
    const menuItems = getMenuForRole(user.role);

    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, {user.name}</h1>
          <p className="text-gray-600">Panel kontrol SINADAS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="p-3 bg-[#f9f5f7] rounded-lg w-fit mb-4">
              <Package className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Aset</p>
            <p className="text-2xl font-bold text-gray-900">{mockAssets.length}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="p-3 bg-[#f9f5f7] rounded-lg w-fit mb-4">
              <FileText className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Pengadaan</p>
            <p className="text-2xl font-bold text-gray-900">{mockProcurements.length}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="p-3 bg-[#f9f5f7] rounded-lg w-fit mb-4">
              <AlertTriangle className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Pemeliharaan</p>
            <p className="text-2xl font-bold text-gray-900">{mockMaintenanceTickets.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Menu Cepat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menuItems.slice(1, 5).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#6B1F3A] hover:bg-[#f9f5f7] transition-all"
                >
                  <div className="p-3 bg-[#f9f5f7] rounded-lg">
                    <Icon className="h-6 w-6 text-[#6B1F3A]" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Route based on role
  if (user.role === 'rektor') {
    return renderRektorDashboard();
  }

  if (user.role === 'sarpras') {
    return renderSarprasDashboard();
  }

  if (user.role.includes('aslab')) {
    return renderAslabDashboard();
  }

  if (user.role === 'kalab' || user.role === 'kaprodi') {
    return renderDefaultDashboard();
  }

  return renderDefaultDashboard();
}
