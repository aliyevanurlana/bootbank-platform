import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "operator" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyOTP: (code: string) => Promise<void>;
  requiresMFA: boolean;
  setRequiresMFA: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [requiresMFA, setRequiresMFA] = useState(false);

  const login = async (email: string, _password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRequiresMFA(true);
  };

  const verifyOTP = async (_code: string) => {
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser({
      id: "1",
      email: "demo@bootbank.az",
      name: "Demo User",
      role: "customer",
    });
    setRequiresMFA(false);
  };

  const logout = () => {
    setUser(null);
    setRequiresMFA(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        verifyOTP,
        requiresMFA,
        setRequiresMFA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      login: async () => {},
      logout: () => {},
      verifyOTP: async () => {},
      requiresMFA: false,
      setRequiresMFA: () => {},
    };
  }
  return context;
}
