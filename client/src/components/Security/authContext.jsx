import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [tempMfaToken, setTempMfaToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      setAccessToken(null);
    }
  };

  const clearTempMfaToken = () => setTempMfaToken(null);

  return (
    <AuthContext.Provider value={{
      accessToken,
      setAccessToken,
      login,
      logout,
      tempMfaToken,
      setTempMfaToken,
      clearTempMfaToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
