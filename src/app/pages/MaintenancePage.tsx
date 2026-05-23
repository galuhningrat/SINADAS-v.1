import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMaintenanceTickets } from '../data/mockData';
import { Plus, Search, AlertTriangle, Wrench } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { rolePermissions } from '../config/roles';

export function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const permissions = rolePermissions[user.role];

  const filteredTickets = mockMaintenanceTickets.filter((ticket) => {
    const matchesSearch =
      ticket.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dilaporkan':
        return 'bg-red-100 text-red-700';
      case 'dalam_antrian':
        return 'bg-yellow-100 text-yellow-700';
      case 'dalam_perbaikan':
        return 'bg-blue-100 text-blue-700';
      case 'menunggu_part':
        return 'bg-purple-100 text-purple-700';
      case 'selesai':
      case 'ditutup':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'ringan':
        return 'bg-blue-100 text-blue-700';
      case 'sedang':
        return 'bg-yellow-100 text-yellow-700';
      case 'berat':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pemeliharaan Aset</h1>
          <p className="text-gray-600">Kelola laporan kerusakan dan pemeliharaan</p>
        </div>
        {permissions.canCreateMaintenance && (
          <button
            onClick={() => navigate('/maintenance/new')}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31] transition-colors"
          >
            <Plus className="h-5 w-5" />
            Laporkan Kerusakan
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
              placeholder="Cari tiket..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="dilaporkan">Dilaporkan</option>
            <option value="dalam_antrian">Dalam Antrian</option>
            <option value="dalam_perbaikan">Dalam Perbaikan</option>
            <option value="menunggu_part">Menunggu Part</option>
            <option value="selesai">Selesai</option>
            <option value="ditutup">Ditutup</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Total Tiket</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockMaintenanceTickets.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Dilaporkan</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {mockMaintenanceTickets.filter((t) => t.status === 'dilaporkan').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Wrench className="h-4 w-4" />
            <span className="text-sm">Dalam Perbaikan</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {mockMaintenanceTickets.filter((t) => t.status === 'dalam_perbaikan').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="text-sm">Est. Biaya</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            Rp{' '}
            {(
              mockMaintenanceTickets.reduce((sum, t) => sum + (t.estimatedCost || 0), 0) / 1000000
            ).toFixed(1)}
            M
          </p>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => navigate(`/maintenance/${ticket.id}`)}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#6B1F3A] hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{ticket.assetName}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getSeverityColor(ticket.severity)}`}>
                    {ticket.severity}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-mono">{ticket.ticketNumber}</span>
                  <span>•</span>
                  <span>{ticket.assetCode}</span>
                  <span>•</span>
                  <span>{ticket.reportDate}</span>
                </div>
              </div>

              <div className="text-right">
                {ticket.estimatedCost && (
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    Rp {(ticket.estimatedCost / 1000000).toFixed(1)}M
                  </p>
                )}
                <span className={`inline-flex px-3 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-900">Jenis Kerusakan:</span> {ticket.damageType}
              </p>
              <p className="text-sm text-gray-600">{ticket.description}</p>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <span>Dilaporkan oleh: {ticket.reportedBy}</span>
                {ticket.assignedTo && (
                  <>
                    <span>•</span>
                    <span>Ditangani oleh: {ticket.assignedTo}</span>
                  </>
                )}
              </div>
            </div>

            {ticket.notes && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Catatan:</span> {ticket.notes}
                </p>
              </div>
            )}
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada tiket pemeliharaan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
