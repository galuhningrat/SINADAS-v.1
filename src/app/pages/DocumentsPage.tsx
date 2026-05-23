import { useState } from 'react';
import { mockDocuments } from '../data/mockData';
import { Search, Upload, Download, FileText, Eye, Trash2, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { rolePermissions } from '../config/roles';

export function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { user } = useAuth();

  if (!user) return null;

  const permissions = rolePermissions[user.role];

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockDocuments.map((d) => d.category)))];

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-[#6B1F3A]" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Arsip Dokumen</h1>
          <p className="text-gray-600">Kelola dan arsipkan dokumen terkait aset</p>
        </div>
        {permissions.canManageDocuments && (
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6B1F3A] text-white rounded-lg hover:bg-[#5a1a31] transition-colors">
            <Upload className="h-5 w-5" />
            Upload Dokumen
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
              placeholder="Cari dokumen..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">Total Dokumen</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockDocuments.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="text-sm">Pengadaan</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {mockDocuments.filter((d) => d.category === 'Pengadaan').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="text-sm">Laporan</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {mockDocuments.filter((d) => d.category === 'Laporan').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="text-sm">Manual</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {mockDocuments.filter((d) => d.category === 'Manual').length}
          </p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#6B1F3A] hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-[#f9f5f7] rounded-lg">
                {getFileIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.category}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Tipe:</span>
                <span className="font-medium">{doc.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ukuran:</span>
                <span className="font-medium">{doc.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Upload:</span>
                <span className="font-medium">{doc.uploadDate}</span>
              </div>
              <div>
                <span className="text-xs">Oleh: {doc.uploadedBy}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Eye className="h-4 w-4" />
                Lihat
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Download className="h-4 w-4" />
                Download
              </button>
              {permissions.canManageDocuments && (
                <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="col-span-full bg-white rounded-xl p-12 border border-gray-200 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada dokumen ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
