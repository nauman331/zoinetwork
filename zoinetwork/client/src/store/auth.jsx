import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

  // Get token from local storage
  const localToken = localStorage.getItem("token") || "";
  const localPrint = localStorage.getItem("fingerprint") || "";

const [token, setToken] = useState(localToken);
const [user, setUser] = useState("");
const [fingerprint, setFingerprint] = useState(localPrint)
const authorizationToken = `Bearer ${token}`

let isLoggedIn = !!token;

const LogoutUser = () => {

    setToken("");
    return localStorage.removeItem("token");
}

const userAuthentication = async () => {

    try {
        const response = await fetch("https://zoinetwork-api.vercel.app/api/auth/user", {
            method: "GET",
            headers:{
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            const data = await response.json();
            console.log("user data", data.userData)
            setUser(data.userData)
            
        }
        
    } catch (error) {
        console.log("error in fetching user data");
    }
    
    }
    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token]);

    const storetokenInLS = (serverToken, serverPrint) => {
        setToken(serverToken);
        setFingerprint(serverPrint)
        localStorage.setItem("token", serverToken);
        localStorage.setItem("fingerprint", serverPrint);
    };
      



return( <AuthContext.Provider value={{ storetokenInLS, LogoutUser, isLoggedIn, user, authorizationToken, fingerprint }}>
    {children}
</AuthContext.Provider>)
}

//custom hook

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside the the Provider")
    }
    return authContextValue;
}

