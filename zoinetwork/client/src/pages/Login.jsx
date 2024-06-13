import "../assets/stylesheets/authentication.css"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"

const Login = () => {

    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const {storetokenInLS} = useAuth();

    const URL = 'https://zoinetwork-api.vercel.app/api/auth/login'

    const [user, setUser] = useState({
        email : "",
        password : ""
    })

const HandleShow = () => {
    setShow(!show)
}


const HandleSubmit = async (e) => {
e.preventDefault();

try {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    
    })
    const res_data = await response.json();
    if(response.ok){
        setUser({
            email : "",
            password : ""
        })
        toast.success("Logged In successfuly")
        storetokenInLS(res_data.token)
        navigate('/');
    }else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.msg)
    }
} catch (error) {
    toast.error("invalid credentials", error);
}

}

const HandleInput = (e) => {
let name = e.target.name;
let value = e.target.value;

setUser({
    ...user,
    [name]: value
})

}


    return (
        <>
            <section className="form-section">
                <h1 style={{textAlign: 'center', marginTop:'1rem', color:'#216AD9'}}>ZOI Network Platform</h1>
                <h5 style={{textAlign: 'center', color:'#216AD9'}}>A future crypto coin</h5>

                <form onSubmit={HandleSubmit} className="authform">

                    <h1>Welcome Back</h1>
                    <p>Earn zoi coin today and get big profits in future</p>
                   

                    <div className="form-input">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="user123@user.com"
                     name="email" autoComplete="off" required
                     onChange={HandleInput}
                     value={user.email}
                     />
                    </div>

  

                    <div className="form-input">
                    <i className="fa-solid fa-lock"></i>
                    <input type= { !show ? "password" : "text"} placeholder="mypassword123%"
                     name="password" autoComplete="off" required
                     onChange={HandleInput}
                     value={user.password}
                     />
                  {  show ? (<i className="fa-solid fa-eye" onClick={HandleShow}></i> ) : (<i className="fa-solid fa-eye-slash" onClick={HandleShow}></i>) }
                    </div>
                    <button type="submit">Login</button>
                    <h5 style={{textAlign: 'center', marginTop:'1rem'}}>Don,t Have an account?</h5>
                    <button className='link-text' type="submit"><NavLink to="/register">Create an Account</NavLink></button>
                </form>
            </section>
        </>
    )
}

export default Login
