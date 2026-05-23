import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockBorrowings } from '../data/mockData';
import { Plus, Search, Clock, ClipboardList } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { rolePermissions } from '../config/roles';

export function BorrowingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const permissions = rolePermissions[user.role];

  const filteredBorrowings = mockBorrowings.filter((borrow) => {
    const matchesSearch =
      borrow.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.borrowNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || borrow.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'diajukan':
        return 'bg-yellow-100 text-yellow-700';
      case 'disetujui':
        return 'bg-green-100 text-green-700';
      case 'dipinjam':
        return 'bg-blue-100 text-blue-700';
      case 'dikembalikan':
        return 'bg-gray-100 text-gray-700';
      case 'terlambat':
        return 'bg-red-100 text-red-700';
      case 'ditolak':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Peminjaman Aset</h1>
          <p className="text-gray-600">Kelola peminjaman dan pengembalian aset</p>
        </div>
        {permissions.canBorrow && (
          <button
            onClick={() => navigate('/borrowing/new')}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31] transition-colors"
          >
            <Plus className="h-5 w-5" />
            Ajukan Peminjaman
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari peminjaman..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="diajukan">Diajukan</option>
            <option value="disetujui">Disetujui</option>
            <option value="dipinjam">Dipinjam</option>
            <option value="dikembalikan">Dikembalikan</option>
            <option value="terlambat">Terlambat</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <ClipboardList className="h-4 w-4" />
            <span className="text-sm">Total Peminjaman</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockBorrowings.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Aktif</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {mockBorrowings.filter((b) => b.status === 'dipinjam').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Menunggu</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {mockBorrowings.filter((b) => b.status === 'diajukan' || b.status === 'disetujui').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="text-sm">Dikembalikan</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {mockBorrowings.filter((b) => b.status === 'dikembalikan').length}
          </p>
        </div>
      </div>

      {/* Borrowings List */}
      <div className="space-y-4">
        {filteredBorrowings.map((borrow) => (
          <div
            key={borrow.id}
            onClick={() => navigate(`/borrowing/${borrow.id}`)}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#6B1F3A] hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{borrow.assetName}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-mono">{borrow.borrowNumber}</span>
                  <span>•</span>
                  <span>{borrow.assetCode}</span>
                </div>
              </div>

              <span className={`inline-flex px-3 py-1 text-xs rounded-full ${getStatusColor(borrow.status)}`}>
                {borrow.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Peminjam</p>
                <p className="text-sm font-medium text-gray-900">{borrow.borrower}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Tujuan</p>
                <p className="text-sm font-medium text-gray-900">{borrow.purpose}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Pinjam: {borrow.borrowDate}</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Kembali: {borrow.returnDate}</span>
              </div>
              {borrow.actualReturnDate && (
                <>
                  <span>•</span>
                  <span className="text-green-600">Dikembalikan: {borrow.actualReturnDate}</span>
                </>
              )}
            </div>

            {borrow.approvedBy && (
              <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                Disetujui oleh: {borrow.approvedBy}
              </div>
            )}
          </div>
        ))}

        {filteredBorrowings.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada peminjaman ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
