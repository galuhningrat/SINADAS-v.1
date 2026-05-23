import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { roleLabels } from '../config/roles';
import { UserRole } from '../types';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, selectRole, availableRoles, needsRoleSelection } = useAuth() as any;
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      if (!(needsRoleSelection as boolean)) {
        toast.success('Login berhasil!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role: UserRole) => {
    selectRole(role);
    toast.success('Role berhasil dipilih!');
    navigate('/dashboard');
  };

  if (needsRoleSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6B1F3A] via-[#5a1a31] to-[#4a162a] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6B1F3A] rounded-full mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Pilih Role</h1>
              <p className="text-sm text-gray-600 mt-2">
                Akun Anda memiliki beberapa role, silakan pilih role untuk masuk
              </p>
            </div>

            <div className="space-y-3">
              {availableRoles.map((role: UserRole) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelection(role)}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#6B1F3A] hover:bg-[#f9f5f7] transition-all group"
                >
                  <span className="font-medium text-gray-900">{roleLabels[role]}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#6B1F3A] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6B1F3A] via-[#5a1a31] to-[#4a162a] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6B1F3A] rounded-full mb-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SINADAS</h1>
            <p className="text-sm text-gray-600 mt-2">
              Sistem Informasi Aset dan Sarana Prasarana
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
                  placeholder="nama@sinadas.ac.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3A] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B1F3A] text-white py-3 rounded-lg hover:bg-[#5a1a31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Demo Credentials:
            </p>
            <div className="mt-2 text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Rektor:</span>
                <span className="font-mono">rektor@sinadas.ac.id</span>
              </div>
              <div className="flex justify-between">
                <span>Sarpras:</span>
                <span className="font-mono">sarpras@sinadas.ac.id</span>
              </div>
              <div className="flex justify-between">
                <span>Aslab (Multi-role):</span>
                <span className="font-mono">aslab@sinadas.ac.id</span>
              </div>
              <p className="text-center mt-2 text-gray-500">Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
