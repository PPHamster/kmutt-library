
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider(props) {
    const [ authUser, setAuthUser] = useState(null)
    const [ isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (email, password) => {
        if (email === "admin.lib@kmutt.ac.th" && password === "adminlib") {
          setIsLoggedIn(true);
          setAuthUser({
            Name: "John Doe"
          }) 
        }
      }
    const logout = () => {
          setIsLoggedIn(false);
          setAuthUser(null) 
        }
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
};
