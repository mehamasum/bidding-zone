import React, { useState } from 'react';

const LOCAL_STORAGE_TOKEN_KEY = 'bidding-zone-token';
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || false
  );

  const onLoginSuccess = token => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  const onLogoutSuccess = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onLoginSuccess,
        onLogoutSuccess
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
