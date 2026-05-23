import { useState } from 'react';
import { mockAssets, mockProcurements, mockMaintenanceTickets, mockBorrowings } from '../data/mockData';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#6B1F3A', '#9e3c5e', '#b86687', '#d199b3', '#e7ccd9'];

export function ReportsPage() {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('thisMonth');

  const assetsByCategory = Array.from(new Set(mockAssets.map((a) => a.category))).map((category) => ({
    name: category,
    value: mockAssets.filter((a) => a.category === category).length
  }));

  const assetsByLocation = Array.from(new Set(mockAssets.map((a) => a.location))).map((location) => ({
    name: location,
    count: mockAssets.filter((a) => a.location === location).length,
    value: mockAssets.filter((a) => a.location === location).reduce((sum, a) => sum + a.currentValue, 0) / 1000000
  }));

  const assetsByCondition = [
    { name: 'Baik', value: mockAssets.filter((a) => a.condition === 'baik').length },
    { name: 'Rusak Ringan', value: mockAssets.filter((a) => a.condition === 'rusak_ringan').length },
    { name: 'Rusak Berat', value: mockAssets.filter((a) => a.condition === 'rusak_berat').length }
  ];

  const monthlyTrend = [
    { month: 'Jan', assets: 45, value: 320 },
    { month: 'Feb', assets: 48, value: 350 },
    { month: 'Mar', assets: 52, value: 380 },
    { month: 'Apr', assets: 55, value: 400 },
    { month: 'Mei', assets: mockAssets.length, value: mockAssets.reduce((sum, a) => sum + a.currentValue, 0) / 1000000 }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analisis</h1>
          <p className="text-gray-600">Visualisasi data dan statistik aset</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="h-5 w-5" />
          Export PDF
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
          >
            <option value="overview">Ringkasan Keseluruhan</option>
            <option value="assets">Laporan Aset</option>
            <option value="procurement">Laporan Pengadaan</option>
            <option value="maintenance">Laporan Pemeliharaan</option>
            <option value="financial">Laporan Keuangan</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
          >
            <option value="thisMonth">Bulan Ini</option>
            <option value="lastMonth">Bulan Lalu</option>
            <option value="thisQuarter">Kuartal Ini</option>
            <option value="thisYear">Tahun Ini</option>
            <option value="lastYear">Tahun Lalu</option>
          </select>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Mei 2026</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#f9f5f7] rounded-lg">
              <Package className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Total Aset</p>
              <p className="text-2xl font-bold text-gray-900">{mockAssets.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+12% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#f9f5f7] rounded-lg">
              <DollarSign className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Nilai Total</p>
              <p className="text-xl font-bold text-gray-900">
                Rp {(mockAssets.reduce((sum, a) => sum + a.currentValue, 0) / 1000000).toFixed(0)}M
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+8% dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#f9f5f7] rounded-lg">
              <FileText className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Pengadaan Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{mockProcurements.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>2 menunggu persetujuan</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-[#f9f5f7] rounded-lg">
              <BarChart3 className="h-6 w-6 text-[#6B1F3A]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Tiket Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{mockMaintenanceTickets.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>{mockMaintenanceTickets.filter(t => t.status === 'dalam_perbaikan').length} dalam perbaikan</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Distribusi Aset per Kategori</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {assetsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Status Kondisi Aset</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetsByCondition}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6B1F3A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Tren Pertumbuhan Aset (5 Bulan Terakhir)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="assets" stroke="#6B1F3A" strokeWidth={2} name="Jumlah Aset" />
              <Line yAxisId="right" type="monotone" dataKey="value" stroke="#9e3c5e" strokeWidth={2} name="Nilai (Jt)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Nilai Aset per Lokasi (Jutaan Rp)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetsByLocation} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#6B1F3A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Ringkasan Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kondisi Baik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perlu Perbaikan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assetsByCategory.map((cat) => {
                const categoryAssets = mockAssets.filter((a) => a.category === cat.name);
                const goodCondition = categoryAssets.filter((a) => a.condition === 'baik').length;
                const needsRepair = categoryAssets.filter((a) => a.condition !== 'baik').length;
                const totalValue = categoryAssets.reduce((sum, a) => sum + a.currentValue, 0);

                return (
                  <tr key={cat.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cat.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{goodCondition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{needsRepair}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rp {(totalValue / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
