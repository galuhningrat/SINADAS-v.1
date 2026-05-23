import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProcurements } from '../data/mockData';
import { Plus, Search, Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { rolePermissions } from '../config/roles';

export function ProcurementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const permissions = rolePermissions[user.role];

  const filteredProcurements = mockProcurements.filter((proc) => {
    const matchesSearch =
      proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.requestNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || proc.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'diajukan':
        return 'bg-blue-100 text-blue-700';
      case 'disetujui_kaprodi':
      case 'disetujui_sarpras':
        return 'bg-yellow-100 text-yellow-700';
      case 'disetujui_rektor':
        return 'bg-green-100 text-green-700';
      case 'ditolak':
        return 'bg-red-100 text-red-700';
      case 'dalam_proses':
        return 'bg-purple-100 text-purple-700';
      case 'selesai':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'rendah':
        return 'bg-gray-100 text-gray-700';
      case 'sedang':
        return 'bg-blue-100 text-blue-700';
      case 'tinggi':
        return 'bg-orange-100 text-orange-700';
      case 'mendesak':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengadaan Aset</h1>
          <p className="text-gray-600">Kelola pengajuan dan persetujuan pengadaan</p>
        </div>
        {permissions.canCreateProcurement && (
          <button
            onClick={() => navigate('/procurement/new')}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31] transition-colors"
          >
            <Plus className="h-5 w-5" />
            Ajukan Pengadaan
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
              placeholder="Cari pengadaan..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="diajukan">Diajukan</option>
            <option value="disetujui_sarpras">Disetujui Sarpras</option>
            <option value="disetujui_rektor">Disetujui Rektor</option>
            <option value="dalam_proses">Dalam Proses</option>
            <option value="selesai">Selesai</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">Total Pengadaan</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockProcurements.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Menunggu</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {mockProcurements.filter((p) => p.status.includes('disetujui') || p.status === 'diajukan').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">Selesai</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {mockProcurements.filter((p) => p.status === 'selesai').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="text-sm">Total Anggaran</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            Rp {(mockProcurements.reduce((sum, p) => sum + p.estimatedBudget, 0) / 1000000).toFixed(0)}M
          </p>
        </div>
      </div>

      {/* Procurements List */}
      <div className="space-y-4">
        {filteredProcurements.map((proc) => (
          <div
            key={proc.id}
            onClick={() => navigate(`/procurement/${proc.id}`)}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#6B1F3A] hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{proc.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getUrgencyColor(proc.urgency)}`}>
                    {proc.urgency}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-mono">{proc.requestNumber}</span>
                  <span>•</span>
                  <span>{proc.requester}</span>
                  <span>•</span>
                  <span>{proc.date}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-gray-900 mb-2">
                  Rp {(proc.estimatedBudget / 1000000).toFixed(1)}M
                </p>
                <span className={`inline-flex px-3 py-1 text-xs rounded-full ${getStatusColor(proc.status)}`}>
                  {proc.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Items Preview */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-2">Item yang diajukan:</p>
              <div className="space-y-1">
                {proc.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">
                      {item.name} ({item.quantity} {item.unit})
                    </span>
                    <span className="text-gray-600">
                      Rp {(item.estimatedPrice / 1000000).toFixed(1)}M
                    </span>
                  </div>
                ))}
                {proc.items.length > 2 && (
                  <p className="text-xs text-gray-500">+{proc.items.length - 2} item lainnya</p>
                )}
              </div>
            </div>

            {/* Approval Progress */}
            {proc.approvalHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  {proc.approvalHistory.map((approval, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex items-center gap-2">
                        {approval.status === 'approved' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : approval.status === 'rejected' ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-600">{approval.approver.split(',')[0]}</span>
                      </div>
                      {index < proc.approvalHistory.length - 1 && (
                        <div className="w-8 h-px bg-gray-300 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredProcurements.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada pengadaan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
