import { useParams, useNavigate } from 'react-router-dom';
import { mockAssets, mockMaintenanceTickets } from '../data/mockData';
import {
  ArrowLeft,
  Edit,
  QrCode as QrCodeIcon,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  Clock,
  FileText,
  Download
} from 'lucide-react';
import { useState } from 'react';

export function AssetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const asset = mockAssets.find((a) => a.id === id);
  const assetTickets = mockMaintenanceTickets.filter((t) => t.assetId === id);

  if (!asset) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Aset tidak ditemukan</p>
        <button
          onClick={() => navigate('/assets')}
          className="mt-4 text-[#6B1F3A] hover:underline"
        >
          Kembali ke daftar aset
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Ringkasan' },
    { id: 'specifications', label: 'Spesifikasi' },
    { id: 'maintenance', label: 'Riwayat Pemeliharaan' },
    { id: 'documents', label: 'Dokumen' }
  ];

  return (
    <div>
      <button
        onClick={() => navigate('/assets')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar Aset
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-[#f9f5f7] rounded-lg">
              <Package className="h-8 w-8 text-[#6B1F3A]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{asset.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-mono font-medium text-[#6B1F3A]">{asset.code}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {asset.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/assets/${asset.id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31]">
              <QrCodeIcon className="h-4 w-4" />
              Cetak QR
            </button>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex px-3 py-1 text-sm rounded-full ${
              asset.condition === 'baik'
                ? 'bg-green-100 text-green-700'
                : asset.condition === 'rusak_ringan'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            Kondisi: {asset.condition.replace(/_/g, ' ')}
          </span>
          <span
            className={`inline-flex px-3 py-1 text-sm rounded-full ${
              asset.status === 'aktif'
                ? 'bg-green-100 text-green-700'
                : asset.status === 'dalam_pemeliharaan'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            Status: {asset.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Tanggal Pembelian</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{asset.purchaseDate}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Harga Beli</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            Rp {(asset.purchasePrice / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Nilai Saat Ini</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            Rp {(asset.currentValue / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Garansi</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {asset.warranty ? `Hingga ${asset.warranty}` : 'Tidak ada'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#6B1F3A] text-[#6B1F3A]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Informasi Umum</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Kategori</p>
                    <p className="text-gray-900">{asset.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Lokasi</p>
                    <p className="text-gray-900">{asset.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Manufacturer</p>
                    <p className="text-gray-900">{asset.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Serial Number</p>
                    <p className="text-gray-900 font-mono">{asset.serialNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Deskripsi</h3>
                <p className="text-gray-600">{asset.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Spesifikasi Teknis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Manufacturer</p>
                  <p className="text-gray-900 font-medium">{asset.manufacturer}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Serial Number</p>
                  <p className="text-gray-900 font-mono">{asset.serialNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Kode QR</p>
                  <p className="text-gray-900 font-mono">{asset.qrCode}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Garansi</p>
                  <p className="text-gray-900">{asset.warranty || 'Tidak ada garansi'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Riwayat Pemeliharaan</h3>
              {assetTickets.length > 0 ? (
                <div className="space-y-3">
                  {assetTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{ticket.ticketNumber}</p>
                          <p className="text-sm text-gray-600">{ticket.damageType}</p>
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
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
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Dilaporkan: {ticket.reportDate}</span>
                        <span>Oleh: {ticket.reportedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>Tidak ada riwayat pemeliharaan</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Dokumen Terkait</h3>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="h-4 w-4" />
                  Upload Dokumen
                </button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>Belum ada dokumen</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
