import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAssets } from '../data/mockData';
import {
  QrCode as QrCodeIcon,
  Camera,
  Package,
  AlertTriangle,
  ClipboardList,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

export function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedAsset, setScannedAsset] = useState<any>(null);
  const [manualCode, setManualCode] = useState('');
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);

    setTimeout(() => {
      const randomAsset = mockAssets[Math.floor(Math.random() * mockAssets.length)];
      setScannedAsset(randomAsset);
      setIsScanning(false);
      toast.success('QR Code berhasil dipindai!');
    }, 1500);
  };

  const handleManualSearch = () => {
    const asset = mockAssets.find(
      (a) => a.code.toLowerCase() === manualCode.toLowerCase() || a.qrCode?.toLowerCase() === manualCode.toLowerCase()
    );

    if (asset) {
      setScannedAsset(asset);
      toast.success('Aset ditemukan!');
    } else {
      toast.error('Kode tidak ditemukan');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
        <p className="text-gray-600">Pindai QR code untuk melihat detail aset atau laporkan kerusakan</p>
      </div>

      {/* Scanner Section */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md aspect-square bg-gray-900 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
            {isScanning ? (
              <div className="relative">
                <div className="absolute inset-0 border-2 border-[#6B1F3A] animate-pulse" />
                <Camera className="h-16 w-16 text-white animate-pulse" />
                <p className="text-white mt-4">Memindai...</p>
              </div>
            ) : (
              <div className="text-center">
                <QrCodeIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Tekan tombol untuk mulai memindai</p>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full max-w-md flex items-center justify-center gap-2 px-6 py-3 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="h-5 w-5" />
            {isScanning ? 'Memindai...' : 'Mulai Scan QR Code'}
          </button>

          <div className="w-full max-w-md mt-6">
            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">atau</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Masukkan Kode Manual
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Masukkan kode aset atau QR code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
                />
                <button
                  onClick={handleManualSearch}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanned Asset Info */}
      {scannedAsset && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-[#6B1F3A]" />
            Informasi Aset
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nama Aset</p>
                <p className="font-semibold text-gray-900">{scannedAsset.name}</p>
              </div>
              <span
                className={`inline-flex px-3 py-1 text-xs rounded-full ${
                  scannedAsset.condition === 'baik'
                    ? 'bg-green-100 text-green-700'
                    : scannedAsset.condition === 'rusak_ringan'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {scannedAsset.condition.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Kode Aset</p>
                <p className="font-mono text-gray-900">{scannedAsset.code}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Kategori</p>
                <p className="text-gray-900">{scannedAsset.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Lokasi</p>
                <p className="text-gray-900">{scannedAsset.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-gray-900">{scannedAsset.status.replace(/_/g, ' ')}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Deskripsi</p>
              <p className="text-gray-900">{scannedAsset.description}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => navigate(`/assets/${scannedAsset.id}`)}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Package className="h-5 w-5" />
              Detail Lengkap
            </button>

            <button
              onClick={() => {
                navigate('/maintenance/new', { state: { assetId: scannedAsset.id } });
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <AlertTriangle className="h-5 w-5" />
              Laporkan Kerusakan
            </button>

            <button
              onClick={() => {
                navigate('/borrowing/new', { state: { assetId: scannedAsset.id } });
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31] transition-colors"
            >
              <ClipboardList className="h-5 w-5" />
              Pinjam Aset
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!scannedAsset && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Cara Menggunakan</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-semibold">1.</span>
              <span>Klik tombol "Mulai Scan QR Code" untuk mengaktifkan kamera</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">2.</span>
              <span>Arahkan kamera ke QR code yang terdapat pada aset</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">3.</span>
              <span>Informasi aset akan ditampilkan setelah QR code berhasil dipindai</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">4.</span>
              <span>Pilih aksi yang ingin dilakukan (lihat detail, lapor kerusakan, atau pinjam aset)</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
