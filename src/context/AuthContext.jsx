/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { formatJWTTokenToUser } from "../utils/utils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = formatJWTTokenToUser(token);
      if (user) {
        setLoggedInUser({ ...user, token });
      }
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("token", user.token);
    setLoggedInUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
