import { useParams, useNavigate } from 'react-router-dom';
import { mockProcurements } from '../data/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { rolePermissions } from '../config/roles';
import { toast } from 'sonner';

export function ProcurementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const permissions = rolePermissions[user.role];
  const procurement = mockProcurements.find((p) => p.id === id);

  if (!procurement) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Pengadaan tidak ditemukan</p>
        <button
          onClick={() => navigate('/procurement')}
          className="mt-4 text-[#6B1F3A] hover:underline"
        >
          Kembali ke daftar pengadaan
        </button>
      </div>
    );
  }

  const handleApprove = () => {
    toast.success('Pengadaan berhasil disetujui!');
  };

  const handleReject = () => {
    toast.error('Pengadaan ditolak');
  };

  const canApprove =
    permissions.canApproveProcurement &&
    procurement.approvalHistory.some((a) => a.role === user.role && a.status === 'pending');

  return (
    <div>
      <button
        onClick={() => navigate('/procurement')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar Pengadaan
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{procurement.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-mono font-medium text-[#6B1F3A]">{procurement.requestNumber}</span>
              <span>•</span>
              <span>{procurement.requester}</span>
              <span>•</span>
              <span>{procurement.date}</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Estimasi Anggaran</p>
            <p className="text-2xl font-bold text-gray-900">
              Rp {(procurement.estimatedBudget / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex px-3 py-1 text-sm rounded-full ${
              procurement.status === 'disetujui_rektor'
                ? 'bg-green-100 text-green-700'
                : procurement.status === 'ditolak'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {procurement.status.replace(/_/g, ' ')}
          </span>
          <span
            className={`inline-flex px-3 py-1 text-sm rounded-full ${
              procurement.urgency === 'mendesak'
                ? 'bg-red-100 text-red-700'
                : procurement.urgency === 'tinggi'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            Urgency: {procurement.urgency}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Deskripsi</h3>
            <p className="text-gray-600">{procurement.description}</p>
          </div>

          {/* Justification */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Justifikasi</h3>
            <p className="text-gray-600">{procurement.justification}</p>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Daftar Item</h3>
            <div className="space-y-3">
              {procurement.items.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.specification}</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 ml-4">
                      Rp {(item.estimatedPrice / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      Jumlah: {item.quantity} {item.unit}
                    </span>
                    <span>•</span>
                    <span>Total: Rp {((item.estimatedPrice * item.quantity) / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <p className="font-semibold text-gray-900">Total Estimasi</p>
              <p className="text-xl font-bold text-[#6B1F3A]">
                Rp {(procurement.estimatedBudget / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Approval Flow */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Alur Persetujuan</h3>
            <div className="space-y-4">
              {procurement.approvalHistory.map((approval, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {approval.status === 'approved' ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      ) : approval.status === 'rejected' ? (
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{approval.approver}</p>
                      <p className="text-xs text-gray-500 capitalize">{approval.role.replace(/_/g, ' ')}</p>
                      {approval.date && <p className="text-xs text-gray-500 mt-1">{approval.date}</p>}
                      {approval.notes && <p className="text-sm text-gray-600 mt-2">{approval.notes}</p>}
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        approval.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : approval.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {approval.status === 'approved'
                        ? 'Disetujui'
                        : approval.status === 'rejected'
                        ? 'Ditolak'
                        : 'Menunggu'}
                    </span>
                  </div>

                  {index < procurement.approvalHistory.length - 1 && (
                    <div className="w-px h-6 bg-gray-200 ml-4 my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Approval Actions */}
          {canApprove && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Aksi Persetujuan</h3>
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Setujui Pengadaan
                </button>
                <button
                  onClick={handleReject}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                  Tolak Pengadaan
                </button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Informasi</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Kategori</p>
                <p className="text-gray-900 font-medium">{procurement.category}</p>
              </div>
              <div>
                <p className="text-gray-600">Tanggal Pengajuan</p>
                <p className="text-gray-900 font-medium">{procurement.date}</p>
              </div>
              <div>
                <p className="text-gray-600">Pengaju</p>
                <p className="text-gray-900 font-medium">{procurement.requester}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
