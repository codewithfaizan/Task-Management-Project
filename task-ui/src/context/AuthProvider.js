import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    let [auth, setAuth] = useState({});
     auth = JSON.parse(localStorage.getItem("email"))

     const [currentComponent, setCurrentComponent] = useState()
     const [isLogin, setIsLogin] = useState(auth?.email ? true : false);
    
   
    return (
        <AuthContext.Provider value={{ auth, setAuth,currentComponent, setCurrentComponent, isLogin,  setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;