import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioId, setUsuarioId] = useState(null);

  return (
    <AuthContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}