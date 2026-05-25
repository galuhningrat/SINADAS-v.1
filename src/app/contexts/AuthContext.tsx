import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<
  string,
  { password: string; roles: UserRole[]; name: string }
> = {
  "rektor@sinadas.ac.id": {
    password: "demo123",
    roles: ["rektor"],
    name: "Muhammad Sugiarto, S.E., M.M.",
  },
  "sarpras@sinadas.ac.id": {
    password: "demo123",
    roles: ["sarpras"],
    name: "Harry Darmawan, S.Kom.",
  },
  "pengadaan@sinadas.ac.id": {
    password: "demo123",
    roles: ["pj_pengadaan"],
    name: "Khairul Rizal, S.Pd.",
  },
  "kalab@sinadas.ac.id": {
    password: "demo123",
    roles: ["kalab"],
    name: "Andre Septian, S.Kom., M.Kom.",
  },
  "kaprodi@sinadas.ac.id": {
    password: "demo123",
    roles: ["kaprodi"],
    name: "Bima Azis Kusuma, S.T., M.T.",
  },
  "aslab_ti@sinadas.ac.id": {
    password: "demo123",
    roles: ["aslab_ti"],
    name: "Galuh Rokhmannudin",
  },
  "aslab_elektro@sinadas.ac.id": {
    password: "demo123",
    roles: ["aslab_elektro"],
    name: "Fuad Abdurrohman Salam",
  },
  "aslab_mesin@sinadas.ac.id": {
    password: "demo123",
    roles: ["aslab_mesin"],
    name: "Agi Fadillah",
  },
  "pemeliharaan@sinadas.ac.id": {
    password: "demo123",
    roles: ["pemeliharaan"],
    name: "Zaky Mubarok, S.Farm.",
  },
  "keuangan@sinadas.ac.id": {
    password: "demo123",
    roles: ["keuangan"],
    name: "Rodlotun Nazilah, A.Md.Keb.",
  },
  "admin@sinadas.ac.id": {
    password: "demo123",
    roles: ["administrasi"],
    name: "Utami Alifah Sukur, A.Md.Kes.",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  const login = async (email: string, password: string) => {
    const userData = mockUsers[email];

    if (!userData || userData.password !== password) {
      throw new Error("Email atau password salah");
    }

    if (userData.roles.length > 1) {
      setAvailableRoles(userData.roles);
      setPendingEmail(email);
    } else {
      setUser({
        id: email.split("@")[0],
        name: userData.name,
        email: email,
        role: userData.roles[0],
      });
    }
  };

  const selectRole = (role: UserRole) => {
    const userData = mockUsers[pendingEmail];
    if (userData && userData.roles.includes(role)) {
      setUser({
        id: pendingEmail.split("@")[0],
        name: userData.name,
        email: pendingEmail,
        role: role,
      });
      setAvailableRoles([]);
      setPendingEmail("");
    }
  };

  const logout = () => {
    setUser(null);
    setAvailableRoles([]);
    setPendingEmail("");
  };

  const value = {
    user,
    login,
    logout,
    selectRole,
    isAuthenticated: !!user,
    availableRoles,
    needsRoleSelection: availableRoles.length > 0,
  };

  return (
    <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
