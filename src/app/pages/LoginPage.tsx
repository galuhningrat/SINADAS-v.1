// src/app/pages/LoginPage.tsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { roleLabels } from "../config/roles";
import { UserRole } from "../types";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllCredentials, setShowAllCredentials] = useState(false);
  const { login, selectRole, availableRoles, needsRoleSelection } =
    useAuth() as any;
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      if (!(needsRoleSelection as boolean)) {
        toast.success("Login berhasil!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role: UserRole) => {
    selectRole(role);
    toast.success("Role berhasil dipilih!");
    navigate("/dashboard");
  };

  // Semua akun demo — urutan sesuai hierarki RBAC di SRS
  const demoCredentials = [
    { label: "Rektor", email: "rektor@sinadas.ac.id" },
    { label: "Sarpras", email: "sarpras@sinadas.ac.id" },
    { label: "PJ Pengadaan", email: "pengadaan@sinadas.ac.id" },
    { label: "Kalab TI", email: "kalab@sinadas.ac.id" },
    { label: "Kaprodi TI", email: "kaprodi@sinadas.ac.id" },
    { label: "Tim Pemeliharaan", email: "pemeliharaan@sinadas.ac.id" },
    { label: "Keuangan", email: "keuangan@sinadas.ac.id" },
    { label: "Administrasi", email: "admin@sinadas.ac.id" },
    { label: "Aslab TI", email: "aslab_ti@sinadas.ac.id" },
    { label: "Aslab Elektro", email: "aslab_elektro@sinadas.ac.id" },
    { label: "Aslab Mesin", email: "aslab_mesin@sinadas.ac.id" },
  ];

  // Yang ditampilkan saat collapsed (3 akun utama)
  const visibleCredentials = showAllCredentials
    ? demoCredentials
    : demoCredentials.slice(0, 3);

  if (needsRoleSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6B1F3A] via-[#5a1a31] to-[#4a162a] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <img
                src="/logo-stti.png"
                alt="Logo STTI Cirebon"
                className="w-16 h-16 object-contain mx-auto mb-4"
              />
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
                  <span className="font-medium text-gray-900">
                    {roleLabels[role]}
                  </span>
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
            <img
              src="/logo-stti.png"
              alt="Logo STTI Cirebon"
              className="w-16 h-16 object-contain mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">SINADAS</h1>
            <p className="text-sm text-gray-600 mt-2">
              Sistem Informasi Inventaris dan Administrasi Aset
            </p>
            <p className="text-sm text-gray-600">STTI Cirebon</p>
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
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center font-medium mb-3">
              Demo Credentials — Password:{" "}
              <span className="font-mono font-semibold text-gray-700">
                demo123
              </span>
            </p>

            <div className="space-y-1.5">
              {visibleCredentials.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword("demo123");
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#f9f5f7] hover:border-[#6B1F3A] border border-transparent transition-all group"
                >
                  <span className="text-xs text-gray-600 group-hover:text-[#6B1F3A]">
                    {cred.label}
                  </span>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-[#6B1F3A]">
                    {cred.email}
                  </span>
                </button>
              ))}
            </div>

            {/* Toggle show all / collapse */}
            <button
              type="button"
              onClick={() => setShowAllCredentials(!showAllCredentials)}
              className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-[#6B1F3A] hover:underline py-1"
            >
              {showAllCredentials ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Sembunyikan
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Lihat semua {demoCredentials.length} role
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
