import { NavLink, Outlet, Navigate } from "react-router-dom"
import "../assets/stylesheets/admin.css"
import { useAuth } from "../store/auth"


const Admin = () => {

const {user} = useAuth()

if(!user.isAdmin) {
    return <Navigate to="/"></Navigate>
}

    return (
        <>
        <section className="admin-section">
            <h1>{user.username} 😎</h1>
            <h5>You are admin you can kick out users if you want</h5>
         <nav className="admin-nav">
            <NavLink to="/admin/users" className="admin-link">users</NavLink>
            <NavLink to="/admin/contacts" className="admin-link">contacts</NavLink>
         </nav>
         <Outlet />
         </section>
        </>
    )
}

export default Admin
