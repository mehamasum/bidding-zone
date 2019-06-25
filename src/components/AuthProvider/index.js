import React, { useState } from 'react';

const LOCAL_STORAGE_TOKEN_KEY = 'bidding-zone-token';
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null
  );

  const onLoginSuccess = token => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    setToken(true);
  };

  const onLogoutSuccess = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setToken(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        onLoginSuccess,
        onLogoutSuccess
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
