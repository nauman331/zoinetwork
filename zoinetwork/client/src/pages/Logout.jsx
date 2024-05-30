import { useEffect } from "react"
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const { LogoutUser } = useAuth();
    
            useEffect(() => {
              return () => {
                LogoutUser();
              };
            }, [LogoutUser])

            return <Navigate to="/"></Navigate>
            
   
}

export default Logout
