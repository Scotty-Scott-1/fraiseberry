import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [tempMfaToken, setTempMfaToken] = useState(null);

  const login = (token) => {
    setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
  };

  const clearTempMfaToken = () => setTempMfaToken(null);

  return (
    <AuthContext.Provider value={{
      accessToken,
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
