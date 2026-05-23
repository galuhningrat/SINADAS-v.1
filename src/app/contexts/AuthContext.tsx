import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; roles: UserRole[]; name: string }> = {
  'rektor@sinadas.ac.id': {
    password: 'demo123',
    roles: ['rektor'],
    name: 'Dr. Ahmad Budiman, M.T.'
  },
  'sarpras@sinadas.ac.id': {
    password: 'demo123',
    roles: ['sarpras'],
    name: 'Ir. Siti Nurhaliza'
  },
  'pengadaan@sinadas.ac.id': {
    password: 'demo123',
    roles: ['pj_pengadaan'],
    name: 'Budi Santoso, S.T.'
  },
  'kalab@sinadas.ac.id': {
    password: 'demo123',
    roles: ['kalab'],
    name: 'Dr. Eng. Wisnu Wardana'
  },
  'kaprodi@sinadas.ac.id': {
    password: 'demo123',
    roles: ['kaprodi'],
    name: 'Dr. Ratna Dewi, M.Kom.'
  },
  'aslab@sinadas.ac.id': {
    password: 'demo123',
    roles: ['aslab_ti', 'aslab_elektro', 'aslab_mesin'],
    name: 'Muhammad Rizki'
  },
  'pemeliharaan@sinadas.ac.id': {
    password: 'demo123',
    roles: ['pemeliharaan'],
    name: 'Eko Prasetyo'
  },
  'keuangan@sinadas.ac.id': {
    password: 'demo123',
    roles: ['keuangan'],
    name: 'Dra. Lestari Wijaya'
  },
  'admin@sinadas.ac.id': {
    password: 'demo123',
    roles: ['administrasi'],
    name: 'Dewi Anggraini'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [pendingEmail, setPendingEmail] = useState<string>('');

  const login = async (email: string, password: string) => {
    const userData = mockUsers[email];

    if (!userData || userData.password !== password) {
      throw new Error('Email atau password salah');
    }

    // If user has multiple roles, store them for role selection
    if (userData.roles.length > 1) {
      setAvailableRoles(userData.roles);
      setPendingEmail(email);
    } else {
      // Auto login with single role
      setUser({
        id: email.split('@')[0],
        name: userData.name,
        email: email,
        role: userData.roles[0]
      });
    }
  };

  const selectRole = (role: UserRole) => {
    const userData = mockUsers[pendingEmail];
    if (userData && userData.roles.includes(role)) {
      setUser({
        id: pendingEmail.split('@')[0],
        name: userData.name,
        email: pendingEmail,
        role: role
      });
      setAvailableRoles([]);
      setPendingEmail('');
    }
  };

  const logout = () => {
    setUser(null);
    setAvailableRoles([]);
    setPendingEmail('');
  };

  const value = {
    user,
    login,
    logout,
    selectRole,
    isAuthenticated: !!user,
    availableRoles,
    needsRoleSelection: availableRoles.length > 0
  };

  return <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
