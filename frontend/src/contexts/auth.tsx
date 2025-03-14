import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUser } from "../queries/userQueries"; // Ensure this fetches user data correctly

interface User {
  name: string;
  pid: string;
  email?: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("jwt_token") || null
  );
  const [user, setUser] = useState<User | null>(null);
  // Fetch user info when token is available
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: checkUser,
    enabled: !!token && !user, // Fetch only if token exists and user does not
  });

  console.log('hi')

  useEffect(() => {
    if (data && token && !user) {
      setUser(data);
    }
  }, [data, token, user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt_token", token);
    } else {
      localStorage.removeItem("jwt_token");
      setUser(null); // Reset user when logged out
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
